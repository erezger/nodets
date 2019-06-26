import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const AuthSchema = new Schema({
  username: {
    type: String,
    require: 'Enter user name'
  },
  email: {
    type: String,
    require: 'Enter user email address',
    unique: true
  },
  password: {
    type: String,
    require: 'Enter user password',
  },
});

export interface TokenData {
  token: string;
  expiresIn?: number;
}

export interface DataStoredInToken {
  _id: string;
}
