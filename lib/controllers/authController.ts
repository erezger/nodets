import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import {Request, Response} from "express";
import {AuthSchema} from "../models/authModel";

const User = mongoose.model('Auth', AuthSchema);

export default class AuthController {

  public static hashPassword(password: string, rounds: number, callback: (error: Error, hash: string) => void): void {
    bcrypt.hash(password, rounds, (error, hash) => {
      callback(error, hash);
    });
  }

  public static compare(password: string, dbHash: string, callback: (error: string | null, match: boolean | null) => void) {
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

  public registerNewUser(req: Request, res: Response) {
    let newUser = new User(req.body);

    AuthController.hashPassword(newUser.password, 12, (err, hash) => {
      if (err) {
        // throw and error
      } else {
        // store the new hash in the database etc
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash
        }, function (err, result) {
          if (err) {
            // throw and error
          } else
            res.json({status: "success", message: "User added successfully!!!", data: null});
        });
      }
    });
  }

  public authenticate(req: Request, res: Response) {
    let user = new User(req.body);
    User.findOne({email: req.body.email}, function (err, userInfo) {
      if (err) {
        // db error
      } else {
        // now lets compare the passwords
        AuthController.compare(user.password, userInfo.password, (error: string | null, match: boolean | null) => {
          if (error) {
            // passwords did not match
            console.log('wrong password')
            res.send({status: 400, message: 'wrong password'});
          } else {
            console.log('password matches');
            res.send({status: 200, message: 'password match'});
            // passwords match
          }
        })

      }
    });
  }

}
