import {Application} from "express";
import {AllUserCommand} from "../../../applicaion/commandBuses/userCommandBus/commands/AllUsersCommand.js";
import {CreateUserCommand} from "../../../applicaion/commandBuses/userCommandBus/commands/CreateUserCommand.js";
import {DeleteUserCommand} from "../../../applicaion/commandBuses/userCommandBus/commands/DeleteUserCommand.js";
import {LogInUserCommand} from "../../../applicaion/commandBuses/userCommandBus/commands/LogInUserCommand.js";
import {UserCommandBus} from "../../../applicaion/commandBuses/userCommandBus/UserCommandBus.js";
import {crudLogs} from "../log/crudLogs.js";

export class userRouteAdapter<T> {
  constructor(private app: Application, private userInvoker: UserCommandBus) {}

  public userLoginRoute() {
    this.app.use(crudLogs);
    this.app.post("/api/user/login", async ({body: {email, password}}, res) => {
      try {
        const response = await this.userInvoker.execute(new LogInUserCommand({email, password}));
        // console.log("\x1b[33mline 19:\x1b[0m ");
        // console.log(response);
        res.status(200).send(response);
      } catch (error: any) {
        console.log("\x1b[33mError line 22:\x1b[0m ");
        console.log(error);
        res.status(404).json({error});
      }
    });
  }

  public userSignupRoute() {
    this.app.use(crudLogs);
    this.app.post("/api/user/signup", async ({body: {name, email}}, res) => {
      console.log(name, email);
      try {
        // // const response1 = await createCommand.handle(new CreateAccountCommand(email, password));
        const response = await this.userInvoker.execute(new CreateUserCommand({name, email}));
        console.log(response);
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
  public userFetchAllRoute() {
    this.app.use(crudLogs);
    this.app.get("/api/users", async (_, res) => {
      try {
        const response = await this.userInvoker.execute(new AllUserCommand());
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
  public delUserRoute() {
    this.app.use(crudLogs);
    this.app.delete(`/api/user/:userId`, async ({params: {userId}}, res) => {
      try {
        const response = await this.userInvoker.execute(new DeleteUserCommand({userId}));
        res.status(200).send(response);
      } catch (error) {
        res.status(404).json({error: error});
      }
    });
  }
}
