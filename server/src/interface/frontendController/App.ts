import {Application} from "express";
import {taskController} from "../../applicaion/controllers/taskController.js";
import {userController} from "../../applicaion/controllers/userController.js";
// import {ConnectMongodb} from "../../infrastructure/databases/mongoose/connect/mongodbConnect.js";
// import {ConnecPrisma} from "../../infrastructure/databases/prisma/connect/prismaConnect.js";
// import {ConnectTypeORM} from "../../infrastructure/databases/typeORM/connect/typeORMConnect.js";
import {Config} from "../../types/configtypes.js";

class App {
  private userAccess: userController;
  private taskAccess: taskController;

  constructor(private app: Application, private config: Config) {
    // this.connectionDb = new ConnecPrisma(<string>this.config.db_connect);
    this.userAccess = new userController(this.app, <Config>this.config);
    this.taskAccess = new taskController(this.app, <Config>this.config);
  }

  //TODO user
  public async start() {
    try {
      // const repos = await this.connectionDb.connectionMethod();

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
