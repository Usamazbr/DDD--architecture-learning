import { taskRouteAdapter } from "../../gateways/routes/taskRoute.js";
import { ConnecPrisma } from "../../../infrastructure/databases/prisma/connect/prismaConnect.js";
import { PrismaORMTaskRepository } from "../../../infrastructure/databases/prisma/repositoryAdaptor/prismaTasksRepository.js";
import { TaskFilter } from "../../gateways/middleware/taskFilter.js";
import { MyTaskObserver, TaskServices } from "../../../applicaion/services/taskOps.js";
// import {MyTaskManager} from "../../../applicaion/services/test2TaskOps.js";
export class taskController {
    app;
    config;
    routeAdapter;
    taskUseCase;
    taskRepos;
    connectionDb;
    tokenFilter;
    observer;
    constructor(app, config) {
        this.app = app;
        this.config = config;
        this.connectionDb = new ConnecPrisma(this.config.db_connect);
        this.routeAdapter = new taskRouteAdapter(this.app);
        this.taskRepos = new PrismaORMTaskRepository(this.connectionDb.connectionMethod());
        this.tokenFilter = new TaskFilter(config.secret);
        this.taskUseCase = new TaskServices(this.taskRepos);
        this.observer = new MyTaskObserver();
    }
    /**
     * allRoutesInvocation
     */
    async taskMethod() {
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
