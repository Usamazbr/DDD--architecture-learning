export interface Task {
  id?: string;
  message: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskManager<T> {
  tasks: T[];
  createTask(userId: string, message: string): Promise<T>;
  delTask(id: string): Promise<T>;
  fetchAllTasks(id: string): Promise<T[]>;
  registerObserver(observer: TaskObserver<T>): void;
  unregisterObserver(observer: TaskObserver<T>): void;
  notifyObservers(task: T): void;
}

export interface TaskObserver<T> {
  onTaskUpdate(subject: TaskManager<T>): void;
}
