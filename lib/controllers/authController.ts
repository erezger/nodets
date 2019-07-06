import * as bcrypt from 'bcryptjs';
import {NextFunction, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import User, {DataStoredInToken, IUser, TokenData} from '../models/userModel';

const ObjectId = require('mongodb').ObjectID;

export default class AuthController {

  private static hashPassword(password: string, rounds: number, callback: (error: Error, hash: string) => void): void {
    bcrypt.hash(password, rounds, (error, hash) => {
      callback(error, hash);
    });
  }

  private static compare(password: string, dbHash: string, callback: (error: string | null, match: boolean | null) => void) {
    bcrypt.compare(password, dbHash, (err: Error, match: boolean) => {
      if (match) {
        // passwords match
        callback(null, true);
      } else {
        // passwords do not match
        callback('Invalid password match', null);
      }
    });
  }

  private static createToken(user: any): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_TOKEN_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user.id,
    };
    return {
      token: jwt.sign(dataStoredInToken, secret, {expiresIn}),
    };
  }

  public registerNewUser(req: Request, res: Response, next: NextFunction) {
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    } as IUser;

    AuthController.hashPassword(newUser.password, 12, (err, hash) => {
      if (err) {
        next(new HttpException(500, ''));
      } else {
        newUser.password = hash;
        // store the new hash in the database etc
        User.create(newUser, function (err, result) {
          if (err) {
            next(new HttpException(500, ''));
          } else
            res.json({status: 'success', message: 'User added successfully!!!', data: null});
        });
      }
    });
  }

  public authenticate(req: Request, res: Response, next: NextFunction) {
    let user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    } as IUser;
    let me: any = this;
    User.findOne({email: req.body.email}, function (err, userInfo) {
      if (err) {
        next(new HttpException(500, 'db error'));
      } else {
        try {
          // now lets compare the passwords
          AuthController.compare(user.password, userInfo.password, (error: string | null, match: boolean | null) => {
            if (error) {
              // passwords did not match
              next(new HttpException(400, 'invalid password or email'));
            } else {
              console.log('password matches');
              const accessToken = AuthController.createToken(userInfo);
              userInfo.password = undefined;
              res.send({
                accessToken: accessToken.token,
                data: userInfo,
                status: 200,
              });
              // passwords match
            }
          });
        } catch (e) {
          next(new HttpException(400, 'invalid password or email'));
        }
      }
    });
  }

  public verifyJwt(req: Request, res: Response, next: NextFunction) {
    const secret = process.env.JWT_TOKEN_SECRET;
    let tk = req.headers.authorization;
    try {
      const verificationResponse = jwt.verify(tk, secret) as DataStoredInToken;
      User.findOne({_id: verificationResponse._id}, function (err, userInfo) {
        if (err) {
          next(err);
        } else {
          req.body.userId = userInfo._id;
          next();
        }
      });
    } catch (error) {
      next(new HttpException(401, 'unAuthorized access token'));
    }
  }

  public getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      User.find({}, (err, users) => {
        if (err) {
          res.send(err);
        }
        res.json(users);
      });
    } catch (error) {
      next(new HttpException(401, 'unAuthorized access token'));
    }
  }

}
