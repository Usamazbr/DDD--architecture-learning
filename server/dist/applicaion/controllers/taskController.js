import { userRouteAdapter } from "../gateways/routes/userRoute.js";
import { JwtAdapter } from "./userAdapters/jwtAdapter.js";
// import {Task} from "@prisma/client";
import { ConnecPrisma } from "../../infrastructure/databases/prisma/connect/prismaConnect.js";
import { TaskUseCase } from "../../domain/services/taskOps.js";
// import {ConnectTypeORM} from "../../infrastructure/databases/typeORM/connect/typeORMConnect.js";
// import {ConnectMongodb} from "../../infrastructure/databases/mongoose/connect/mongodbConnect.js";
export class taskController {
    app;
    DB_Address;
    adapter;
    taskAuth;
    connectionDb;
    constructor(app, DB_Address) {
        this.app = app;
        this.DB_Address = DB_Address;
        this.connectionDb = new ConnecPrisma(this.DB_Address);
        this.adapter = new userRouteAdapter(this.app);
        // this.connectionDb.connectionMethod();
        this.taskAuth = new TaskUseCase(new JwtAdapter(), this.connectionDb.connectionMethod());
    }
    /**
     * adapterMethod
     */
    async authMethod() {
        // this.adapter.userFetchAllRoute(this.taskAuth);
        // this.adapter.userLoginRoute(this.taskAuth);
        // this.adapter.userSignupRoute(this.taskAuth);
        // this.adapter.delUserRoute(this.taskAuth);
    }
}
