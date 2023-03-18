import {createConnection, set} from "mongoose";
import {Connect} from "../../../../domain/repos/connection/userDbPort.js";

export class ConnectMongodb extends Connect {
  constructor(private DB_Address: string) {
    super();
  }
  public connectionMethod(): void {
    createConnection(this.DB_Address);
    set("strictQuery", true);
    console.log("\nconnected to \x1b[34mMongoDb\x1b[0m");
  }
}
