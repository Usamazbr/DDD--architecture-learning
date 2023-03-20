import {Application} from "express";

import {userRouteAdapter} from "../gateways/routes/userRoute.js";
import {AuthUseCase} from "../../domain/services/userOps.js";
// import { UseCase } from "../../domain/services/useCase.js";

import {BcryptAdapter} from "./userAdapters/bcryptAdapter.js";
import {JwtAdapter} from "./userAdapters/jwtAdapter.js";

import {UserRepository} from "../../domain/repos/userRespository/userRepos.js";
import {User} from "@prisma/client";
import {ConnecPrisma} from "../../infrastructure/databases/prisma/connect/prismaConnect.js";
// import {ConnectTypeORM} from "../../infrastructure/databases/typeORM/connect/typeORMConnect.js";
// import {ConnectMongodb} from "../../infrastructure/databases/mongoose/connect/mongodbConnect.js";

export class userController {
  private adapter: userRouteAdapter<User>;
  private userAuth: AuthUseCase<User>;
  private connectionDb: ConnecPrisma;

  constructor(private app: Application, private DB_Address: string) {
    this.connectionDb = new ConnecPrisma(<string>this.DB_Address);
    this.adapter = new userRouteAdapter(this.app);
    this.userAuth = new AuthUseCase(
      new JwtAdapter(),
      new BcryptAdapter(),
      <UserRepository<User>>this.connectionDb.connectionMethod()
    );
  }

  /**
   * adapterMethod
   */
  public async authMethod() {
    this.adapter.userLoginRoute(this.userAuth);
  }
}
