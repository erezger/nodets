import * as mongoose from 'mongoose';
import {TaskSchema} from '../models/taskModel';
import {Request, Response} from 'express';

const Task = mongoose.model('Task', TaskSchema);

export class TaskController {

  public getTasks(req: Request, res: Response) {
    Task.find({}, (err, tasks) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      console.log(tasks);
      res.json(tasks);
    });
  }

  public addNewTask(req: Request, res: Response) {
    let newTask = new Task(req.body);

    newTask.save((err, tasks) => {
      if (err) {
        res.send(err);
      }
      res.json(tasks);
    });
  }

  public updateTaskStatus(req: Request, res: Response) {
    let newTask = new Task(req.body);
    console.log('req body111', req.body);
    console.log('req body222', req.body.id);
    console.log('req body333', req.body._id);
    Task.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, task) => {
      if (err) {
        res.send(err);
      }
      res.json(task);
    });
  }

  public deleteTask(req: Request, res: Response) {
    Task.remove({_id: req.params.id}, (err, task) => {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Successfully deleted task!'});
    });
  }

}
