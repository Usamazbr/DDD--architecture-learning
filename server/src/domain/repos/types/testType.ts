import {User} from "./userType.js";

// Adapter interface for TypeORM and MongoDB
export interface IUserAuthAdapterTypeORMMongo {
  // Add methods for CRUD operations on users in TypeORM and MongoDB
  createUser(user: User): Promise<void>;
  getUserByUsername(username: string): Promise<User | null>;
  updateUser(user: User): Promise<void>;
  deleteUser(id: string): Promise<void>;

  // Add method for user authentication in TypeORM and MongoDB
  authenticateUser(username: string, password: string): Promise<boolean>;
}

// Adapter interface for PrismaORM and MySQL
export interface IUserAuthAdapterPrismaMySQL {
  // Add methods for CRUD operations on users in PrismaORM and MySQL
  createUser(user: User): Promise<void>;
  getUserByUsername(username: string): Promise<User | null>;
  updateUser(user: User): Promise<void>;
  deleteUser(id: string): Promise<void>;

  // Add method for user authentication in PrismaORM and MySQL
  authenticateUser(username: string, password: string): Promise<boolean>;
}
