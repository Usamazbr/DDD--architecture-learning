import { crudLogs } from "../log/crudLogs.js";
// import {MyTaskManager} from "../../../applicaion/services/test2TaskOps.js";
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
        this.app.post("/api/tasks", async ({ body, user }, res) => {
            console.log("\x1b[33mline 24:\x1b[0m ");
            console.log(body, user);
            try {
                const response = await useCase.createTask(user, body.message);
                console.log(response);
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
        this.app.get("/api/tasks", async ({ user }, res) => {
            try {
                const response = await useCase.fetchAllTasks(user);
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
        this.app.delete(`/api/tasks/:taskId`, async ({ params }, res) => {
            try {
                const response = await useCase.delTask(params.taskId);
                console.log(response);
                res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                res.status(404).json({ error: error });
            }
        });
    }
}
