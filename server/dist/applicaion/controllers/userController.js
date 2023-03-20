import { userRouteAdapter } from "../gateways/routes/userRoute.js";
import { AuthUseCase } from "../../domain/services/userOps.js";
// import { UseCase } from "../../domain/services/useCase.js";
import { BcryptAdapter } from "./userAdapters/bcryptAdapter.js";
import { JwtAdapter } from "./userAdapters/jwtAdapter.js";
import { ConnecPrisma } from "../../infrastructure/databases/prisma/connect/prismaConnect.js";
// import {ConnectTypeORM} from "../../infrastructure/databases/typeORM/connect/typeORMConnect.js";
// import {ConnectMongodb} from "../../infrastructure/databases/mongoose/connect/mongodbConnect.js";
export class userController {
    app;
    DB_Address;
    adapter;
    userAuth;
    connectionDb;
    constructor(app, DB_Address) {
        this.app = app;
        this.DB_Address = DB_Address;
        this.connectionDb = new ConnecPrisma(this.DB_Address);
        this.adapter = new userRouteAdapter(this.app);
        this.userAuth = new AuthUseCase(new JwtAdapter(), new BcryptAdapter(), this.connectionDb.connectionMethod());
    }
    /**
     * adapterMethod
     */
    async authMethod() {
        this.adapter.userLoginRoute(this.userAuth);
    }
}
