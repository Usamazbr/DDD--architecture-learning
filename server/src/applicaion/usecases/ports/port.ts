import { UseCase } from '../../../domain/services/useCase.js';
// import { HelloWorldController } from "../controllers/useController.js";
import express, { Application } from 'express';

export class ExpressAdapter {
  public router = express.Router();
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public configureRoutes(useCase: UseCase) {
    this.app.get('/users', async (_, res) => {
      const users = await useCase.getUsers();
      console.log(users)
      try {
        //   json(users);
        res.status(200).send(users)
      } catch (err) {
        console.log(err);
        res.status(404).json({ err: err });
      }
    });
  }
}