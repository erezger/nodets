import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TaskSchema = new Schema({
  description: {
    type: String,
    required: 'Enter task description'
  },
  status: {
    type: String,
    enum: ['CREATED', 'PROGRESS', 'DONE'],
    default: 'CREATED'
  },
  dueDate: {
    type: Date
  }
});