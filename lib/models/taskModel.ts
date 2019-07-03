import * as mongoose from 'mongoose';

export interface Task {
  description: string;
  status: string;
  dueDate?: Date;
  reporter?: Date;
}

const Schema = mongoose.Schema;

const taskSchema = new Schema({
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
  },
  reporter: {
    ref: 'Auth',
    type: mongoose.Schema.Types.ObjectId,
  },
  assigneeTo: {
    ref: 'Auth',
    type: mongoose.Schema.Types.ObjectId,
  },
});

const taskModel = mongoose.model<Task & mongoose.Document>('Task', taskSchema);
export default taskModel;