import {Application} from "express";

import {userRouteAdapter} from "../gateways/routes/userRoute.js";

import {JwtAdapter} from "./userAdapters/jwtAdapter.js";

// import {Task} from "@prisma/client";
import {ConnecPrisma} from "../../infrastructure/databases/prisma/connect/prismaConnect.js";
import {TaskRepository} from "../../domain/repos/taskRepository/taskRepos.js";
import {TaskUseCase} from "../../domain/services/taskOps.js";
import {Task} from "../../domain/entities/types/typesTasks.js";
// import {ConnectTypeORM} from "../../infrastructure/databases/typeORM/connect/typeORMConnect.js";
// import {ConnectMongodb} from "../../infrastructure/databases/mongoose/connect/mongodbConnect.js";

export class taskController {
  private adapter: userRouteAdapter<Task>;
  private taskAuth: TaskUseCase<Task>;
  private connectionDb: ConnecPrisma;

  constructor(private app: Application, private DB_Address: string) {
    this.connectionDb = new ConnecPrisma(<string>this.DB_Address);
    this.adapter = new userRouteAdapter(this.app);
    // this.connectionDb.connectionMethod();
    this.taskAuth = new TaskUseCase(new JwtAdapter(), <TaskRepository<Task>>this.connectionDb.connectionMethod());
  }

  /**
   * adapterMethod
   */
  public async authMethod() {
    // this.adapter.userFetchAllRoute(this.taskAuth);
    // this.adapter.userLoginRoute(this.taskAuth);
    // this.adapter.userSignupRoute(this.taskAuth);
    // this.adapter.delUserRoute(this.taskAuth);
  }
}
