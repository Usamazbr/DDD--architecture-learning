import {TokenFactory} from "../../applicaion/ports/userInterfacePorts/tokenPort.js";
import {TaskRepository} from "../repos/taskRepository/taskRepos.js";

export class TaskUseCase<T> {
  constructor(private Token: TokenFactory, private TaskRepos: TaskRepository<T>) {}

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
  public async delTask(id: string) {
    await this.TaskRepos.delete(id);
  }
}
