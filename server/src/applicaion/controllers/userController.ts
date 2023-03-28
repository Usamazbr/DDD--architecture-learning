import {Application} from "express";

import {userRouteAdapter} from "../gateways/routes/userRoute.js";
import {AuthUseCase} from "../services/userOps.js";
// import { UseCase } from "../../domain/services/useCase.js";

import {BcryptAdapter} from "./userAdapters/bcryptAdapter.js";
import {JwtAdapter} from "./userAdapters/jwtAdapter.js";

import {UserRepository} from "../../domain/repos/userRespository/userRepos.js";
import {PrismaClient, User} from "@prisma/client";
import {ConnecPrisma} from "../../infrastructure/databases/prisma/connect/prismaConnect.js";
import {PrismaORMUserRepository} from "../../infrastructure/databases/prisma/repositoryAdaptor/prismaUserRepos.js";
import {Config} from "../../types/configtypes.js";
import {UserCommandBus} from "../commandBuses/userCommandBus/UserCommandBus.js";
import {
  AllUserCommandHandler,
  CreateUserCommandHandler,
  DeleteUserCommandHandler,
  LoginUserCommandHandler
} from "../commandBuses/userCommandBus/handler/Handler.js";
// import {ConnectTypeORM} from "../../infrastructure/databases/typeORM/connect/typeORMConnect.js";
// import {ConnectMongodb} from "../../infrastructure/databases/mongoose/connect/mongodbConnect.js";

export class userController {
  private adapter: userRouteAdapter<User>;
  private userAuth: AuthUseCase<User>;
  private userRepos: PrismaORMUserRepository;
  private connectionDb: ConnecPrisma;
  private userCommandBus: UserCommandBus;
  // private tokenAdapter: JwtAdapter;

  constructor(private app: Application, private config: Config) {
    this.connectionDb = new ConnecPrisma(<string>this.config.db_connect);
    this.userCommandBus = new UserCommandBus();
    this.adapter = new userRouteAdapter(this.app, this.userCommandBus);
    this.userRepos = new PrismaORMUserRepository(<PrismaClient>this.connectionDb.connectionMethod());
    // this.connectionDb.connectionMethod();
    // this.tokenAdapter = new JwtAdapter(<string>config.secret);
    this.userAuth = new AuthUseCase(
      new JwtAdapter(<string>config.secret),
      new BcryptAdapter(),
      <UserRepository<User>>this.userRepos
    );
  }

  /**
   * adapterMethod
   */
  public async authMethod() {
    this.userCommandBus.registerHandler(`AllUserCommand`, new AllUserCommandHandler(this.userAuth));
    this.userCommandBus.registerHandler(`LogInUserCommand`, new LoginUserCommandHandler(this.userAuth));
    this.userCommandBus.registerHandler(`CreateUserCommand`, new CreateUserCommandHandler(this.userAuth));
    this.userCommandBus.registerHandler(`DeleteUserCommand`, new DeleteUserCommandHandler(this.userAuth));
    this.adapter.userFetchAllRoute();
    this.adapter.userLoginRoute();
    this.adapter.userSignupRoute();
    this.adapter.delUserRoute();
  }
}
