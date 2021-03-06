import * as mongoose from 'mongoose';

export interface IUser {
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

const userSchema = new Schema({
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
  },
});

const User = mongoose.model<IUser & mongoose.Document>('users', userSchema);
export default User;
