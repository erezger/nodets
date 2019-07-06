import {NextFunction, Request, Response} from 'express';
import userModel from '../models/userModel';
import HttpException from '../exceptions/HttpException';

const ObjectId = require('mongodb').ObjectID;

export default class UserController {

  public getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      userModel.find({}, (err, users) => {
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
