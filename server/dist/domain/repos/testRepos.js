import { PrismaClient } from "@prisma/client";
const { user } = new PrismaClient();
export async function main() {
    //   let user1 = await user.create({
    //     data: {
    //       name: casual.name,
    //       email: casual.email,
    //       password: casual.password
    //     }
    //   });
    //   const user1 = await user.deleteMany();
    const user1 = await user.findMany();
    console.log(user1);
    //   await user.deleteMany();
}
// main().catch((error) => console.error(error.message));
// // Static factory class for creating user authentication adapters
// class UserAuthAdapterFactory {
//     static createAdapter(databaseConfig: DatabaseConfig): IUserAuthAdapterTypeORMMongo | IUserAuthAdapterPrismaMySQL {
//       // Check the database type in the configuration and return the appropriate adapter instance
//       if (databaseConfig.type === 'typeorm-mongo') {
//         return new UserAuthAdapterTypeORMMongo(databaseConfig.host, databaseConfig.port, databaseConfig.databaseName);
//       } else if (databaseConfig.type === 'prisma-mysql') {
//         return new UserAuthAdapterPrismaMySQL(databaseConfig.host, databaseConfig.port, databaseConfig.databaseName, databaseConfig.username, databaseConfig.password);
//       } else {
//         throw new Error('Unsupported database type');
//       }
//     }
//   }
//   // Adapter implementation for TypeORM and MongoDB
// class UserAuthAdapterTypeORMMongo implements IUserAuthAdapterTypeORMMongo {
//     // Implement the methods defined in the IUserAuthAdapterTypeORMMongo interface
//     async createUser(user: User): Promise<void> {
//       // ...
//     }
//     async getUserByUsername(username: string): Promise<User | null> {
//       // ...
//     }
//     async updateUser(user: User): Promise<void> {
//       // ...
//     }
//     async deleteUser(id: string): Promise<void> {
//       // ...
//     }
//     async authenticateUser(username: string, password: string): Promise<boolean> {
//       // ...
//     }
//   }
//   // Adapter implementation for PrismaORM and MySQL
//   class UserAuthAdapterPrismaMySQL implements IUserAuthAdapterPrismaMySQL {
//     // Implement the methods defined in the IUserAuthAdapterPrismaMySQL interface
//     async createUser(user: User): Promise<void> {
//       // ...
//     }
//     async getUserByUsername(username: string): Promise<User | null> {
//       // ...
//     }
//     async updateUser(user: User): Promise<void
