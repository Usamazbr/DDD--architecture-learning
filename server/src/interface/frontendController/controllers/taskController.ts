import {Application} from "express";

import {taskRouteAdapter} from "../../gateways/routes/taskRoute.js";
// import {TaskUseCase} from "../../../applicaion/services/taskOps.js";

import {TaskRepository} from "../../../domain/repos/taskRepository/taskRepos.js";
import {PrismaClient, Task} from "@prisma/client";
import {ConnecPrisma} from "../../../infrastructure/databases/prisma/connect/prismaConnect.js";
import {PrismaORMTaskRepository} from "../../../infrastructure/databases/prisma/repositoryAdaptor/prismaTasksRepository.js";
import {Config} from "../../../framework/types/configtypes.js";
import {TaskFilter} from "../../gateways/middleware/taskFilter.js";
import {MyTaskObserver, TaskServices} from "../../../applicaion/services/taskOps.js";
// import {MyTaskManager} from "../../../applicaion/services/test2TaskOps.js";

export class taskController {
  private routeAdapter: taskRouteAdapter;
  private taskUseCase: TaskServices<Task>;
  private taskRepos: PrismaORMTaskRepository;
  private connectionDb: ConnecPrisma;
  private tokenFilter: TaskFilter;
  private observer: MyTaskObserver<Task>;

  constructor(private app: Application, private config: Config) {
    this.connectionDb = new ConnecPrisma(<string>this.config.db_connect);
    this.routeAdapter = new taskRouteAdapter(this.app);
    this.taskRepos = new PrismaORMTaskRepository(<PrismaClient>this.connectionDb.connectionMethod());
    this.tokenFilter = new TaskFilter(<string>config.secret);
    this.taskUseCase = new TaskServices(<TaskRepository<Task>>(<unknown>this.taskRepos));
    this.observer = new MyTaskObserver();
  }

  /**
   * allRoutesInvocation
   */
  public async taskMethod() {
    //middleware
    this.app.use(`/api/tasks`, this.tokenFilter.filterMethod);

    //registering Observer
    this.taskUseCase.registerObserver(this.observer);

    //other functions
    this.routeAdapter.taskCreationRoute(this.taskUseCase);
    this.routeAdapter.taskFetchAllRoute(this.taskUseCase);
    this.routeAdapter.delTaskRoute(this.taskUseCase);
  }
}
