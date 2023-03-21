import {Application} from "express";
import {AuthUseCase} from "../../../domain/services/userOps.js";
import {crudLogs} from "../log/crudLogs.js";

export class userRouteAdapter<T> {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public userLoginRoute(useCase: AuthUseCase<T>) {
    this.app.use(crudLogs);
    this.app.post("/api/user/login", async ({body: {email, password}}, res) => {
      // console.log(email, password);
      try {
        const response = await useCase.loginUser(email, password);
        // console.log("\x1b[33mline 19:\x1b[0m ");
        // console.log(response);
        //   json(users);
        res.status(200).send(response);
      } catch (error) {
        console.log(error);
        res.status(404).json({error: error});
      }
    });
  }

  public userSignupRoute(useCase: AuthUseCase<T>) {
    this.app.use(crudLogs);
    this.app.post("/api/user/signup", async ({body: {name, email}}, res) => {
      console.log(name, email);
      try {
        const response = await useCase.signupUser(name, email);
        console.log(response);
        //   json(users);
        res.status(200).send(response);
      } catch (error) {
        console.log(error);
        res.status(404).json({error: error});
      }
    });
  }

  /**
   * userFetchAllRoute
   */
  public userFetchAllRoute(useCase: AuthUseCase<T>) {
    this.app.use(crudLogs);
    this.app.get("/api/users", async (_, res) => {
      try {
        const response = await useCase.fetchAllUsers();
        res.status(200).send(response);
      } catch (error) {
        console.log(error);
        res.status(404).json({error: error});
      }
    });
  }
  /**
   * delUserRoute
   */
  public delUserRoute(useCase: AuthUseCase<T>) {
    this.app.use(crudLogs);
    this.app.delete(`/api/user/:userId`, async ({params}, res) => {
      try {
        const response = await useCase.delUser(params.userId);
      } catch (error) {}
    });
  }
}
