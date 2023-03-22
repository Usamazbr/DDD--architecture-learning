import { crudLogs } from "../log/crudLogs.js";
export class taskRouteAdapter {
    app;
    constructor(app) {
        this.app = app;
        //middleware
    }
    /**
     * taskCreationRoute
     */
    taskCreationRoute(useCase) {
        this.app.use(crudLogs);
        // this.app.use(tasksFilter);
        this.app.post("/api/tasks/", async ({ body, user }, res) => {
            console.log(body, user);
            try {
                // const response = await useCase.createTask(``, body);
                res.status(200).send(`response`);
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
        // this.app.use(tasksFilter);
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
        // this.app.use(tasksFilter);
        this.app.delete(`/api/tasks/:taskId`, async ({ params }, res) => {
            try {
                const response = await useCase.delTask(params.taskId);
            }
            catch (error) { }
        });
    }
}
