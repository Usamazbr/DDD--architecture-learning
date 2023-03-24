import {Application} from "express";

import {taskRouteAdapter} from "../gateways/routes/taskRoute.js";
import {TaskUseCase} from "../../domain/services/taskOps.js";

import {JwtAdapter} from "./userAdapters/jwtAdapter.js";

import {TaskRepository} from "../../domain/repos/taskRepository/taskRepos.js";
import {PrismaClient, Task} from "@prisma/client";
import {ConnecPrisma} from "../../infrastructure/databases/prisma/connect/prismaConnect.js";
import {PrismaORMTaskRepository} from "../../infrastructure/databases/prisma/repositoryAdaptor/prismaTasksRepository.js";
import {Config} from "../../types/configtypes.js";
import {TaskFilter, tasksFilter} from "../gateways/middleware/taskFilter.js";
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
    this.tokenFilter = new TaskFilter(<string>config.secret);
    this.taskUseCase = new TaskUseCase(<TaskRepository<Task>>(<unknown>this.taskRepos));
  }

  /**
   * adapterMethod
   */
  public async taskMethod() {
    // const bullshit = new TaskFilter(new JwtAdapter(`bullshit`));
    // console.log("\x1b[33mline 41:\x1b[0m ");
    // this.tokenFilter.bsmethod();
    //middleware
    this.app.use(`/api/tasks`, this.tokenFilter.filterMethod);
    // this.app.use(`/api/tasks`, tasksFilter);
    // this.app.use(`/api/tasks`, (req: any, res: any, next: any) => {
    //   // console.log("\x1b[33mline 26:\x1b[0m ");
    //   // console.log(body);
    //   const tokenAdapter1 = new JwtAdapter(<string>this.config.secret);
    //   console.log(`filterMethod`);
    //   const {authorization} = req.headers;
    //   if (!authorization) {
    //     return res.status(401).json({error: "Token required"});
    //   }
    //   const token: string = authorization.split(" ")[1];
    //   // this.tokenAdapter.secretKey();
    //   try {
    //     req.user = tokenAdapter1.verifyToken(token);

    //     next();
    //   } catch (error) {
    //     console.log(error);
    //     res.status(401).json({error: "Unauthorized"});
    //   }
    // });

    //other functions
    this.routeAdapter.taskCreationRoute(this.taskUseCase);
    this.routeAdapter.taskFetchAllRoute(this.taskUseCase);
    this.routeAdapter.delTaskRoute(this.taskUseCase);
  }
}
