import {Application} from "express";

import {userRouteAdapter} from "../../gateways/routes/userRoute.js";
// import { UseCase } from "../../domain/services/useCase.js";
import {AuthUseCase} from "../../../applicaion/services/userOps.js";

import {BcryptAdapter} from "../adapters/bcryptAdapter.js";

import {UserRepository} from "../../../domain/repos/userRespository/userRepos.js";
import {PrismaClient, User} from "@prisma/client";
import {ConnecPrisma} from "../../../infrastructure/databases/prisma/connect/prismaConnect.js";
import {PrismaORMUserRepository} from "../../../infrastructure/databases/prisma/repositoryAdaptor/prismaUserRepos.js";
import {Config} from "../../../framework/types/configtypes.js";
import {JwtAdapter} from "../adapters/jwtAdapter.js";
// import {ConnectTypeORM} from "../../infrastructure/databases/typeORM/connect/typeORMConnect.js";
// import {ConnectMongodb} from "../../infrastructure/databases/mongoose/connect/mongodbConnect.js";

export class userController {
  private adapter: userRouteAdapter<User>;
  private userAuth: AuthUseCase<User>;
  private userRepos: PrismaORMUserRepository;
  private connectionDb: ConnecPrisma;
  // private tokenAdapter: JwtAdapter;

  constructor(private app: Application, private config: Config) {
    this.connectionDb = new ConnecPrisma(<string>this.config.db_connect);
    this.adapter = new userRouteAdapter(this.app);
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
    this.adapter.userFetchAllRoute(this.userAuth);
    this.adapter.userLoginRoute(this.userAuth);
    this.adapter.userSignupRoute(this.userAuth);
    this.adapter.delUserRoute(this.userAuth);
  }
}
