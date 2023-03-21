import { userRouteAdapter } from "../gateways/routes/userRoute.js";
import { AuthUseCase } from "../../domain/services/userOps.js";
// import { UseCase } from "../../domain/services/useCase.js";
import { BcryptAdapter } from "./userAdapters/bcryptAdapter.js";
import { JwtAdapter } from "./userAdapters/jwtAdapter.js";
import { ConnecPrisma } from "../../infrastructure/databases/prisma/connect/prismaConnect.js";
import { PrismaORMUserRepository } from "../../infrastructure/databases/prisma/repositoryAdaptor/prismaUserRepos.js";
// import {ConnectTypeORM} from "../../infrastructure/databases/typeORM/connect/typeORMConnect.js";
// import {ConnectMongodb} from "../../infrastructure/databases/mongoose/connect/mongodbConnect.js";
export class userController {
    app;
    DB_Address;
    adapter;
    userAuth;
    userRepos;
    connectionDb;
    constructor(app, DB_Address) {
        this.app = app;
        this.DB_Address = DB_Address;
        this.connectionDb = new ConnecPrisma(this.DB_Address);
        this.adapter = new userRouteAdapter(this.app);
        this.userRepos = new PrismaORMUserRepository(this.connectionDb.connectionMethod());
        // this.connectionDb.connectionMethod();
        this.userAuth = new AuthUseCase(new JwtAdapter(), new BcryptAdapter(), this.userRepos);
    }
    /**
     * adapterMethod
     */
    async authMethod() {
        this.adapter.userFetchAllRoute(this.userAuth);
        this.adapter.userLoginRoute(this.userAuth);
        this.adapter.userSignupRoute(this.userAuth);
        this.adapter.delUserRoute(this.userAuth);
    }
}
