import { crudLogs } from "../log/crudLogs.js";
import { tasksFilter } from "../middleware/taskFilter.js";
export class taskRouteAdapter {
    app;
    constructor(app) {
        this.app = app;
    }
    /**
     * taskCreationRoute
     */
    taskCreationRoute(useCase) {
        this.app.use(crudLogs);
        // this.app.use(tasksFilter)
        this.app.post("/api/tasks/", async ({ body }, res) => {
            try {
                const response = await useCase.fetchAllTasks(body.userId);
                res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                res.status(404).json({ error: error });
            }
        });
    }
    /**
     * taskFetchAllRoute
     */
    taskFetchAllRoute(useCase) {
        this.app.use(crudLogs);
        this.app.use(tasksFilter);
        this.app.get("/api/tasks/", async ({ body }, res) => {
            try {
                const response = await useCase.fetchAllTasks(body.userId);
                res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                res.status(404).json({ error: error });
            }
        });
    }
    /**
     * delTaskRoute
     */
    delTaskRoute(useCase) {
        this.app.use(crudLogs);
        this.app.delete(`/api/user/:taskId`, async ({ params }, res) => {
            try {
                const response = await useCase.delTask(params.taskId);
            }
            catch (error) { }
        });
    }
}
