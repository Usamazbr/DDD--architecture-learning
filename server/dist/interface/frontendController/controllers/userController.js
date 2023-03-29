import { userRouteAdapter } from "../../gateways/routes/userRoute.js";
// import { UseCase } from "../../domain/services/useCase.js";
import { AuthUseCase } from "../../../applicaion/services/userOps.js";
import { BcryptAdapter } from "../adapters/bcryptAdapter.js";
import { ConnecPrisma } from "../../../infrastructure/databases/prisma/connect/prismaConnect.js";
import { PrismaORMUserRepository } from "../../../infrastructure/databases/prisma/repositoryAdaptor/prismaUserRepos.js";
import { JwtAdapter } from "../adapters/jwtAdapter.js";
// import {ConnectTypeORM} from "../../infrastructure/databases/typeORM/connect/typeORMConnect.js";
// import {ConnectMongodb} from "../../infrastructure/databases/mongoose/connect/mongodbConnect.js";
export class userController {
    app;
    config;
    adapter;
    userAuth;
    userRepos;
    connectionDb;
    // private tokenAdapter: JwtAdapter;
    constructor(app, config) {
        this.app = app;
        this.config = config;
        this.connectionDb = new ConnecPrisma(this.config.db_connect);
        this.adapter = new userRouteAdapter(this.app);
        this.userRepos = new PrismaORMUserRepository(this.connectionDb.connectionMethod());
        // this.connectionDb.connectionMethod();
        // this.tokenAdapter = new JwtAdapter(<string>config.secret);
        this.userAuth = new AuthUseCase(new JwtAdapter(config.secret), new BcryptAdapter(), this.userRepos);
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
