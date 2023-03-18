import {Application} from "express";
import {testAdapter} from "../../applicaion/controllers/adapter.js";
import {userController} from "../../applicaion/controllers/userController.js";
// import {ConnectMongodb} from "../../infrastructure/databases/mongoose/connect/mongodbConnect.js";
import {ConnecPrisma} from "../../infrastructure/databases/prisma/connect/prismaConnect.js";
// import {ConnectTypeORM} from "../../infrastructure/databases/typeORM/connect/typeORMConnect.js";
import {Config} from "../../types/configtypes.js";

class App {
  private access: testAdapter;
  private userAccess: userController;
  private connectionDb: ConnecPrisma;

  constructor(private app: Application, private config: Config) {
    this.access = new testAdapter(this.app);
    this.userAccess = new userController(this.app);
    this.connectionDb = new ConnecPrisma(<string>this.config.db_connect);
  }

  //? Test App
  public startTest() {
    try {
      this.access.adapterMethod();
      this.app.listen(this.config.port, () => {
        console.log(`Server_test is running on port \x1b[33m${this.config.port}\x1b[0m`);
      });
    } catch (err) {
      console.log(err);
    }
  }

  //TODO user
  public async start() {
    try {
      await this.connectionDb.connectionMethod();

      this.userAccess.adapterMethod();
      this.app.listen(this.config.port, () => {
        console.log(`Server_1 is running on port \x1b[33m${this.config.port}\x1b[0m`);
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default App;
