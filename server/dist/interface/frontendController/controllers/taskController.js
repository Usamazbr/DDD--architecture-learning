import { TaskUseCase } from "../../../applicaion/services/taskOps.js";
import { ConnecPrisma } from "../../../infrastructure/databases/prisma/connect/prismaConnect.js";
import { PrismaORMTaskRepository } from "../../../infrastructure/databases/prisma/repositoryAdaptor/prismaTasksRepository.js";
import { taskRouteAdapter } from "../../gateways/routes/taskRoute.js";
import { TaskFilter } from "../../middleware/taskFilter.js";
export class taskController {
    app;
    config;
    routeAdapter;
    taskUseCase;
    taskRepos;
    connectionDb;
    tokenFilter;
    constructor(app, config) {
        this.app = app;
        this.config = config;
        this.connectionDb = new ConnecPrisma(this.config.db_connect);
        this.routeAdapter = new taskRouteAdapter(this.app);
        this.taskRepos = new PrismaORMTaskRepository(this.connectionDb.connectionMethod());
        this.tokenFilter = new TaskFilter(config.secret);
        this.taskUseCase = new TaskUseCase(this.taskRepos);
    }
    /**
     * allRoutesInvocation
     */
    async taskMethod() {
        //middleware
        this.app.use(`/api/tasks`, this.tokenFilter.filterMethod);
        //other functions
        this.routeAdapter.taskCreationRoute(this.taskUseCase);
        this.routeAdapter.taskFetchAllRoute(this.taskUseCase);
        this.routeAdapter.delTaskRoute(this.taskUseCase);
    }
}
