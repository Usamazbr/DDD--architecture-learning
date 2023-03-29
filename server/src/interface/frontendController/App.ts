import {Application} from "express";
import {taskController} from "./controllers/taskController.js";
import {userController} from "./controllers/userController.js";
import {Config} from "../../framework/types/configtypes.js";

class App {
  private userAccess: userController;
  private taskAccess: taskController;

  constructor(private app: Application, private config: Config) {
    this.userAccess = new userController(this.app, <Config>this.config);
    this.taskAccess = new taskController(this.app, <Config>this.config);
  }

  //TODO user
  public async start() {
    try {
      await this.userAccess.authMethod();
      await this.taskAccess.taskMethod();
      this.app.listen(this.config.port, () => {
        console.log(`Server_1 is running on port \x1b[33m${this.config.port}\x1b[0m`);
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default App;
