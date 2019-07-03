import * as mongoose from 'mongoose';

export interface Auth {
  username: string;
  email: string;
  password: string;
}

export interface TokenData {
  token: string;
  expiresIn?: number;
}

export interface DataStoredInToken {
  _id: string;
}

const Schema = mongoose.Schema;

const authSchema = new Schema({
  username: {
    type: String,
    require: 'Enter user name',
  },
  email: {
    type: String,
    require: 'Enter user email address',
    unique: true,
  },
  password: {
    type: String,
    require: 'Enter user password',
    select: false,
  },
});

const authModel = mongoose.model<Auth & mongoose.Document>('Auth', authSchema);
export default authModel;
