import {Application} from "express";
import {TaskUseCase} from "../../../domain/services/taskOps.js";
import {crudLogs} from "../log/crudLogs.js";
import {tasksFilter} from "../middleware/taskFilter.js";

export class taskRouteAdapter<T> {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
    //middleware
  }

  /**
   * taskCreationRoute
   */
  public taskCreationRoute(useCase: TaskUseCase<T>) {
    this.app.use(crudLogs);
    // this.app.use(tasksFilter)
    this.app.post("/api/tasks/", async ({body}, res) => {
      try {
        const response = await useCase.fetchAllTasks(body.userId);
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
  public taskFetchAllRoute(useCase: TaskUseCase<T>) {
    this.app.use(crudLogs);
    this.app.use(tasksFilter);
    this.app.get("/api/tasks/", async ({body}, res) => {
      try {
        const response = await useCase.fetchAllTasks(body.userId);
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
  public delTaskRoute(useCase: TaskUseCase<T>) {
    this.app.use(crudLogs);
    this.app.delete(`/api/user/:taskId`, async ({params}, res) => {
      try {
        const response = await useCase.delTask(params.taskId);
      } catch (error) {}
    });
  }
}
