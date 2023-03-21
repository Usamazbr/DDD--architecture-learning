export interface UserRepository<T> {
  findById(id: string): Promise<T | undefined>;
  findByEmail(email: string): Promise<T | undefined>;
  create(user: T): Promise<T | undefined>;
  update(user: T): Promise<void>;
  delete(id: string): Promise<void>;
  purge(): Promise<void | undefined>;
  callAll(): Promise<T[] | undefined>;
}
