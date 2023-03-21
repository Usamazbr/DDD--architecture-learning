export interface TaskRepository<T> {
  findById(id: string): Promise<T | undefined>;
  // findByEmail(email: string): Promise<T | undefined>;
  create(task: T): Promise<T | undefined>;
  update(task: T): Promise<void>;
  delete(id: string): Promise<void>;
  purge(): Promise<void | undefined>;
  callAll(): Promise<T[] | undefined>;
}
