import { taskRouteAdapter } from "../gateways/routes/taskRoute.js";
import { TaskUseCase } from "../../domain/services/taskOps.js";
import { JwtAdapter } from "./userAdapters/jwtAdapter.js";
import { ConnecPrisma } from "../../infrastructure/databases/prisma/connect/prismaConnect.js";
import { PrismaORMTaskRepository } from "../../infrastructure/databases/prisma/repositoryAdaptor/prismaTasksRepository.js";
// import {Task} from "../../domain/entities/types/typesTasks.js";
// import {ConnectTypeORM} from "../../infrastructure/databases/typeORM/connect/typeORMConnect.js";
// import {ConnectMongodb} from "../../infrastructure/databases/mongoose/connect/mongodbConnect.js";
export class taskController {
    app;
    DB_Address;
    adapter;
    taskUseCase;
    taskRepos;
    connectionDb;
    constructor(app, DB_Address) {
        this.app = app;
        this.DB_Address = DB_Address;
        this.connectionDb = new ConnecPrisma(this.DB_Address);
        this.adapter = new taskRouteAdapter(this.app);
        this.taskRepos = new PrismaORMTaskRepository(this.connectionDb.connectionMethod());
        // this.connectionDb.connectionMethod();
        this.taskUseCase = new TaskUseCase(new JwtAdapter(), this.taskRepos);
    }
    /**
     * adapterMethod
     */
    async taskMethod() {
        this.adapter.taskCreationRoute(this.taskUseCase);
        this.adapter.taskFetchAllRoute(this.taskUseCase);
        this.adapter.delTaskRoute(this.taskUseCase);
    }
}
