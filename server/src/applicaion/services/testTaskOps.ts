import {TaskManager, TaskObserver} from "../../domain/entities/types/typesTasks.js";
import {TaskRepository} from "../../domain/repos/taskRepository/taskRepos.js";

export class TaskServices<T> implements TaskManager<T> {
  constructor(private TaskRepos: TaskRepository<T>) {}
  tasks: T[] = [];
  observers: TaskObserver<T>[] = [];

  /**
   * createTask
   */
  public async createTask(userId: string, message: string) {
    if (!message) {
      throw Error("Message must be something!");
    }
    // this.tasks.push(task);
    const task = await this.TaskRepos.create(<T>{userId, message});
    this.notifyObservers();
    return <T>task;
  }

  /**
   * delUser
   */
  public async delTask(id: string) {
    const index = this.tasks.findIndex((t: any) => t.id === id);
    if (index >= 0) {
      this.tasks.splice(index, 1);
      const task: T = await this.TaskRepos.delete(id);
      this.notifyObservers();
      return <T>task;
    }
    return <T>{};
  }

  /**
   * fetchAllUsers standalone
   */
  public async fetchAllTasks(id: string) {
    const tasks = await this.TaskRepos.callUserTasks(id);
    console.log(tasks);
    // this.notifyObservers();
    return <T[]>tasks;
  }

  registerObserver(observer: TaskObserver<T>): void {
    this.observers.push(observer);
  }

  unregisterObserver(observer: TaskObserver<T>): void {
    const index = this.observers.findIndex((o) => o === observer);
    if (index >= 0) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(): void {
    this.observers.forEach((observer) => observer.onTaskUpdate(this));
  }
}

// Observer implementation
export class MyTaskObserver<T> implements TaskObserver<T> {
  public onTaskUpdate(subject: TaskManager<T>) {
    if (subject instanceof TaskServices) {
      console.log(`Tasks updated! ${subject.tasks}`);
    }
  }
}
