import { userRouteAdapter } from "../../gateways/routes/userRoute.js";
// import {AuthUseCase} from "../../../applicaion/services/userOps.js";
// import { UseCase } from "../../domain/services/useCase.js";
import { BcryptAdapter } from "../userAdapters/bcryptAdapter.js";
import { JwtAdapter } from "../userAdapters/jwtAdapter.js";
import { ConnecPrisma } from "../../../infrastructure/databases/prisma/connect/prismaConnect.js";
import { PrismaORMUserRepository } from "../../../infrastructure/databases/prisma/repositoryAdaptor/prismaUserRepos.js";
import { UserCommandBus } from "../../../applicaion/commandBuses/userCommandBus/UserCommandBus.js";
import { AllUserCommandHandler, CreateUserCommandHandler, DeleteUserCommandHandler, LoginUserCommandHandler } from "../../../applicaion/commandBuses/userCommandBus/handler/Handler.js";
import { AuthUseCase, MyUserObserver } from "../../../applicaion/services/userOps.js";
// import {ConnectTypeORM} from "../../infrastructure/databases/typeORM/connect/typeORMConnect.js";
// import {ConnectMongodb} from "../../infrastructure/databases/mongoose/connect/mongodbConnect.js";
export class userController {
    app;
    config;
    adapter;
    userAuth;
    userRepos;
    connectionDb;
    userCommandBus;
    observer;
    // private tokenAdapter: JwtAdapter;
    constructor(app, config) {
        this.app = app;
        this.config = config;
        this.connectionDb = new ConnecPrisma(this.config.db_connect);
        this.userCommandBus = new UserCommandBus();
        this.adapter = new userRouteAdapter(this.app, this.userCommandBus);
        this.userRepos = new PrismaORMUserRepository(this.connectionDb.connectionMethod());
        // this.connectionDb.connectionMethod();
        // this.tokenAdapter = new JwtAdapter(<string>config.secret);
        this.userAuth = new AuthUseCase(new JwtAdapter(config.secret), new BcryptAdapter(), this.userRepos);
        this.observer = new MyUserObserver();
    }
    /**
     * adapterMethod
     */
    async authMethod() {
        // registering Observer
        this.userAuth.registerObserver(this.observer);
        // registering commands
        this.userCommandBus.registerHandler(`AllUserCommand`, new AllUserCommandHandler(this.userAuth));
        this.userCommandBus.registerHandler(`LogInUserCommand`, new LoginUserCommandHandler(this.userAuth));
        this.userCommandBus.registerHandler(`CreateUserCommand`, new CreateUserCommandHandler(this.userAuth));
        this.userCommandBus.registerHandler(`DeleteUserCommand`, new DeleteUserCommandHandler(this.userAuth));
        // Calling routs
        this.adapter.userFetchAllRoute();
        this.adapter.userLoginRoute();
        this.adapter.userSignupRoute();
        this.adapter.delUserRoute();
    }
}
