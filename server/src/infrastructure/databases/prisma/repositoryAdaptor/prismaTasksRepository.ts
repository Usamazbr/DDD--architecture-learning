import {PrismaClient, User} from "@prisma/client";
import {TaskRepository} from "../../../../domain/repos/taskRepository/taskRepos.js";

export class PrismaORMTaskRepository implements TaskRepository<User | null> {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: {id}
    });

    return prismaUser;
  }

  async create(user: User): Promise<User> {
    console.log(user);
    const prismaUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    });
    return prismaUser;
  }

  async update(user: User): Promise<void> {}

  async callAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async purge(): Promise<void> {
    await this.prisma.user.deleteMany();
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {id}
    });
  }
}
