import taskModel from '../models/taskModel';
import {Request, Response} from 'express';

export class TaskController {

  public getTasks(req: Request, res: Response) {
    taskModel.find({}, (err, tasks) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      console.log(tasks);
      res.json(tasks);
    }).populate('reporter').populate('assigneeTo');
  }

  public addNewTask(req: Request, res: Response) {
    let newTask = new taskModel(req.body);
    newTask.reporter = req.body.userId;

    newTask.save((err, tasks) => {
      if (err) {
        res.send(err);
      }
      res.json(tasks);
    });
  }

  public updateTaskStatus(req: Request, res: Response) {
    taskModel.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, task) => {
      if (err) {
        res.send(err);
      }
      res.json(task);
    });
  }

  public deleteTask(req: Request, res: Response) {
    taskModel.remove({_id: req.params.id}, (err, task) => {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Successfully deleted task!'});
    });
  }

}
