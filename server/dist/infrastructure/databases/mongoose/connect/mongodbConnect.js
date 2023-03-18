import { createConnection, set } from "mongoose";
import { Connect } from "../../../../domain/repos/connection/userDbPort.js";
export class ConnectMongodb extends Connect {
    DB_Address;
    constructor(DB_Address) {
        super();
        this.DB_Address = DB_Address;
    }
    connectionMethod() {
        createConnection(this.DB_Address);
        set("strictQuery", true);
        console.log("\nconnected to \x1b[34mMongoDb\x1b[0m");
    }
}
