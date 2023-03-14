import {Application} from "express";
import mongoose from "mongoose";
import {testAdapter} from "../../applicaion/controllers/adapter.js";
import {userController} from "../../applicaion/controllers/userController.js";
import {Config} from "../../types/configtypes.js";

class App {
  private access: testAdapter;
  private userAccess: userController;

  constructor(private app: Application, private config: Config) {
    this.access = new testAdapter(this.app);
    this.userAccess = new userController(this.app);
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
  public start() {
    try {
      mongoose.set("strictQuery", true);
      mongoose.createConnection(<string>this.config.db_connect);

      console.log("\nconnected to \x1b[34mMongoDb\x1b[0m");
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
