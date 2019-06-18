// lib/app.ts
import * as express from "express";
import * as bodyParser from "body-parser";
import {Router} from "./routes/router";
import {MongooseDb} from "./db/mongoose";

class App {

  public app: express.Application;
  public routePrv: Router = new Router;
  public moong: MongooseDb = new MongooseDb;

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.moong.connect();
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({extended: false}));
  }

}

export default new App().app;
