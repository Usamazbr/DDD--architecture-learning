import {Application} from "express";
import {crudLogs} from "../log/crudLogs.js";
import {TaskServices} from "../../../applicaion/services/taskOps.js";
import {Task} from "../../../domain/entities/types/typesTasks.js";
// import {MyTaskManager} from "../../../applicaion/services/test2TaskOps.js";

export class taskRouteAdapter {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  /**
   * taskCreationRoute
   */
  public taskCreationRoute(useCase: TaskServices<Task>) {
    this.app.use(crudLogs);
    this.app.post("/api/tasks", async ({body, user}, res) => {
      console.log("\x1b[33mline 24:\x1b[0m ");
      console.log(body, user);
      try {
        const response = await useCase.createTask(<string>user, body.message);
        console.log(response);
        res.status(200).send(response);
      } catch (error) {
        console.log(error);
        res.status(404).json({error: error});
      }
    });
  }

  /**
   * taskFetchAllRoute
   */
  public taskFetchAllRoute(useCase: TaskServices<Task>) {
    this.app.use(crudLogs);
    this.app.get("/api/tasks", async ({user}, res) => {
      try {
        const response = await useCase.fetchAllTasks(<string>user);
        res.status(200).send(response);
      } catch (error) {
        console.log(error);
        res.status(404).json({error: error});
      }
    });
  }
  /**
   * delTaskRoute
   */
  public delTaskRoute(useCase: TaskServices<Task>) {
    this.app.use(crudLogs);
    this.app.delete(`/api/tasks/:taskId`, async ({params}, res) => {
      try {
        const response = await useCase.delTask(params.taskId);
        console.log(response);
        res.status(200).send(response);
      } catch (error) {
        console.log(error);
        res.status(404).json({error: error});
      }
    });
  }
}
