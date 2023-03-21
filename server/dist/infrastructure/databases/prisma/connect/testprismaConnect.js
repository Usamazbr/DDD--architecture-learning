import { PrismaClient } from "@prisma/client";
import { Connect } from "../../../../domain/repos/connection/userDbPort.js";
// import {UserRepository} from "../../../../domain/repos/userRespository/userRepos.js";
export class TestConnecPrisma extends Connect {
    DB_Address;
    client;
    constructor(DB_Address) {
        super();
        this.DB_Address = DB_Address;
        this.client = new PrismaClient();
    }
    connectionMethod() {
        try {
            console.log(`Prisma method invoked`);
            const connection = this.client;
            console.log("\nconnected to \x1b[34mPrisma\x1b[0m");
            return connection;
        }
        catch (err) {
            console.error(`Data Source initialization error`, err);
            return err;
        }
    }
}
