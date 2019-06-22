import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const AuthSchema = new Schema({
  userName: {
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