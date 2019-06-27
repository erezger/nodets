import {Request, Response} from 'express';
import {TaskController} from '../controllers/taskController';
import AuthController from '../controllers/authController';


export class Router {
  public taskController: TaskController = new TaskController();
  public authController: AuthController = new AuthController();

  public routes(app): void {

    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'GET request successfulll!!!!'
        })
      });

    app.route('/api/*')
      .all(this.authController.verifyJwt);

    // contact routes
    app.route('/api/task')
    // Create a new contact
      .post(this.taskController.addNewTask)
      // Get all contacts
      .get(this.taskController.getTasks)
      // update a specific contact
      .put(this.taskController.updateTaskStatus);

    app.route('/api/task/:contactId')
    // delete a specific contact
      .delete(this.taskController.deleteTask);

    // auth routes
    app.route('/register')
      .post(this.authController.registerNewUser);

    app.route('/login')
      .post(this.authController.authenticate);

  }
}