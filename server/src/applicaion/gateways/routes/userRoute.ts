import {Application} from "express";
import {AuthUseCase} from "../../../domain/services/userOps.js";

export class ExpressAdapter {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public userLoginRoute(useCase: AuthUseCase) {
    this.app.post("/api/user/login", async (_, res) => {
      const response = await useCase.loginUser();
      console.log(response);
      try {
        //   json(users);
        res.status(200).send(response);
      } catch (err) {
        console.log(err);
        res.status(404).json({err: err});
      }
    });
  }
}
