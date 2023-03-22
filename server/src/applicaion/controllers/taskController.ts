import {Application} from "express";

import {taskRouteAdapter} from "../gateways/routes/taskRoute.js";
import {TaskUseCase} from "../../domain/services/taskOps.js";

import {JwtAdapter} from "./userAdapters/jwtAdapter.js";

import {TaskRepository} from "../../domain/repos/taskRepository/taskRepos.js";
import {PrismaClient, Task} from "@prisma/client";
import {ConnecPrisma} from "../../infrastructure/databases/prisma/connect/prismaConnect.js";
import {PrismaORMTaskRepository} from "../../infrastructure/databases/prisma/repositoryAdaptor/prismaTasksRepository.js";
import {Config} from "../../types/configtypes.js";
import {TaskFilter} from "../gateways/middleware/taskFilter.js";
// import {Task} from "../../domain/entities/types/typesTasks.js";
// import {ConnectTypeORM} from "../../infrastructure/databases/typeORM/connect/typeORMConnect.js";
// import {ConnectMongodb} from "../../infrastructure/databases/mongoose/connect/mongodbConnect.js";

export class taskController {
  private routeAdapter: taskRouteAdapter<Task>;
  private taskUseCase: TaskUseCase<Task>;
  private taskRepos: PrismaORMTaskRepository;
  private connectionDb: ConnecPrisma;
  private tokenFilter: TaskFilter;

  constructor(private app: Application, private config: Config) {
    this.connectionDb = new ConnecPrisma(<string>this.config.db_connect);
    this.routeAdapter = new taskRouteAdapter(this.app);
    this.taskRepos = new PrismaORMTaskRepository(<PrismaClient>this.connectionDb.connectionMethod());
    // this.connectionDb.connectionMethod();
    // this.tokenFilter = new TaskFilter(new JwtAdapter(<string>config.secret));
    this.tokenFilter = new TaskFilter(new JwtAdapter(<string>config.secret));
    this.taskUseCase = new TaskUseCase(<TaskRepository<Task>>(<unknown>this.taskRepos));
  }

  /**
   * adapterMethod
   */
  public async taskMethod() {
    // const bullshit = new TaskFilter(new JwtAdapter(`bullshit`));
    console.log("\x1b[33mline 41:\x1b[0m ");
    this.tokenFilter.bsmethod();
    //middleware
    // this.app.use(this.tokenFilter.filterMethod);

    //other functions
    this.routeAdapter.taskCreationRoute(this.taskUseCase);
    this.routeAdapter.taskFetchAllRoute(this.taskUseCase);
    this.routeAdapter.delTaskRoute(this.taskUseCase);
  }
}
