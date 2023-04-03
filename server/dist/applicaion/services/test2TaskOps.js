// import {TaskManager, TaskObserver} from "../../domain/entities/types/typesTasks.js";
// import {TaskRepository} from "../../domain/repos/taskRepository/taskRepos.js";
export {};
// export class MyTaskManager<T> implements TaskManager<T> {
//   constructor(private TaskRepos: TaskRepository<T>) {}
//   tasks: T[] = [];
//   observers: TaskObserver<T>[] = [];
//   /**
//    * createTask
//    */
//   public async createTask(userId: string, message: string): Promise<void> {
//     if (!message) {
//       throw Error("Message must be something!");
//     }
//     // this.tasks.push(task);
//     const task = await this.TaskRepos.create(<T>{userId, message});
//     this.notifyObservers(<T>task);
//   }
//   /**
//    * delUser
//    */
//   public async delTask(id: string): Promise<void> {
//     const index = this.tasks.findIndex((t: any) => t.id === id);
//     if (index >= 0) {
//       this.tasks.splice(index, 1);
//       const task = await this.TaskRepos.delete(id);
//       this.notifyObservers(<T>task);
//     }
//   }
//   /**
//    * fetchAllUsers standalone
//    */
//   public async fetchAllTasks(id: string): Promise<void> {
//     const tasks = await this.TaskRepos.callUserTasks(id);
//     console.log(tasks);
//     this.notifyObservers(<T[]>tasks);
//   }
//   registerObserver(observer: TaskObserver<T>): void {
//     this.observers.push(observer);
//   }
//   unregisterObserver(observer: TaskObserver<T>): void {
//     const index = this.observers.findIndex((o) => o === observer);
//     if (index >= 0) {
//       this.observers.splice(index, 1);
//     }
//   }
//   notifyObservers(task: T | T[]): void {
//     this.observers.forEach((observer) => observer.onTaskUpdate(task));
//   }
// }
