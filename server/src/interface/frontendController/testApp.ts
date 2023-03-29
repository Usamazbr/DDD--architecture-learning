import {Application} from "express";
import {testAdapter} from "./controllers/testAdapter.js";
import {Config} from "../../framework/types/configtypes.js";

export class TestApp {
  private access: testAdapter;

  constructor(private app: Application, private config: Config) {
    this.access = new testAdapter(this.app);
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
}
