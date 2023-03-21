import {Application} from "express";

import {taskRouteAdapter} from "../gateways/routes/taskRoute.js";
import {TaskUseCase} from "../../domain/services/taskOps.js";

import {JwtAdapter} from "./userAdapters/jwtAdapter.js";

import {TaskRepository} from "../../domain/repos/taskRepository/taskRepos.js";
import {PrismaClient, Task} from "@prisma/client";
import {ConnecPrisma} from "../../infrastructure/databases/prisma/connect/prismaConnect.js";
import {PrismaORMTaskRepository} from "../../infrastructure/databases/prisma/repositoryAdaptor/prismaTasksRepository.js";
// import {Task} from "../../domain/entities/types/typesTasks.js";
// import {ConnectTypeORM} from "../../infrastructure/databases/typeORM/connect/typeORMConnect.js";
// import {ConnectMongodb} from "../../infrastructure/databases/mongoose/connect/mongodbConnect.js";

export class taskController {
  private adapter: taskRouteAdapter<Task>;
  private taskUseCase: TaskUseCase<Task>;
  private taskRepos: PrismaORMTaskRepository;
  private connectionDb: ConnecPrisma;

  constructor(private app: Application, private DB_Address: string) {
    this.connectionDb = new ConnecPrisma(<string>this.DB_Address);
    this.adapter = new taskRouteAdapter(this.app);
    this.taskRepos = new PrismaORMTaskRepository(<PrismaClient>this.connectionDb.connectionMethod());
    // this.connectionDb.connectionMethod();
    this.taskUseCase = new TaskUseCase(new JwtAdapter(), <TaskRepository<Task>>(<unknown>this.taskRepos));
  }

  /**
   * adapterMethod
   */
  public async taskMethod() {
    //middleware
    this.adapter.taskCreationRoute(this.taskUseCase);
    this.adapter.taskFetchAllRoute(this.taskUseCase);
    this.adapter.delTaskRoute(this.taskUseCase);
  }
}
