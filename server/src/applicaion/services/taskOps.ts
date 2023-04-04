import {Task, TaskManager, TaskObserver} from "../../domain/entities/types/typesTasks.js";
import {TaskRepository} from "../../domain/repos/taskRepository/taskRepos.js";

export class TaskServices<T extends Task> implements TaskManager<T> {
  tasks: T[] = [];
  observers: TaskObserver<T>[] = [];

  constructor(private TaskRepos: TaskRepository<T>) {}
  /**
   * createTask
   */
  public async createTask(userId: string, message: string) {
    if (!message) {
      throw Error("Message must be something!");
    }
    const task = await this.TaskRepos.create(<T>{userId, message});
    this.tasks.push(<T>task);
    this.notifyObservers();
    return <T>task;
  }

  /**
   * delUser
   */
  public async delTask(id: string) {
    const index = this.tasks.findIndex((t: T) => t.id === id);
    console.log(index);
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
  public async fetchAllTasks(userId: string) {
    const userTasks = await this.TaskRepos.callUserTasks(userId);
    // console.log(userTasks);
    this.tasks = <T[]>userTasks;
    // this.notifyObservers();
    return <T[]>userTasks;
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
      console.log(`Observation: Tasks updated!`);
      subject.tasks.map(({message}) => console.log(message));
    }
  }
}
