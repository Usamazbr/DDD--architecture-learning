import {TaskRepository} from "../../domain/repos/taskRepository/taskRepos.js";

export class TaskUseCase<T> {
  constructor(private TaskRepos: TaskRepository<T>) {}

  /**
   * fetchAllUsers
   */
  public async fetchAllTasks(id: string): Promise<T[]> {
    const tasks = await this.TaskRepos.callUserTasks(id);
    return <T[]>tasks;
  }

  /**
   * delUser
   */
  public async delTask(id: string): Promise<any> {
    return await this.TaskRepos.delete(id);
  }

  /**
   * createTask
   */
  public async createTask(userId: string, message: string): Promise<T> {
    if (!message) {
      throw Error("Message must be something!");
    }
    const task = await this.TaskRepos.create(<T>{userId, message});
    return <T>task;
  }
}
