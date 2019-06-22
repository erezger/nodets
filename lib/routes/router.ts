import {Request, Response} from "express";
import {ContactController} from "../controllers/contactController";
import AuthController from "../controllers/authController";


export class Router {
  public contactController: ContactController = new ContactController();
  public authController: AuthController = new AuthController();

  public routes(app): void {

    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'GET request successfulll!!!!'
        })
      });

    // contact routes
    app.route('/contact')
    // Create a new contact
      .post(this.contactController.addNewContact)
      // Get all contacts
      .get(this.contactController.getContacts);

    app.route('/contact/:contactId')
    // get a specific contact
      .get(this.contactController.getContactWithID)
      // update a specific contact
      .put(this.contactController.updateContact)
      // delete a specific contact
      .delete(this.contactController.deleteContact);

    // auth routes
    app.route('/register')
      .post(this.authController.registerNewUser);

    app.route('/login')
      .post(this.authController.authenticate);

  }
}