import {PrismaClient, Task} from "@prisma/client";
import {TaskRepository} from "../../../../domain/repos/taskRepository/taskRepos.js";

export class PrismaORMTaskRepository implements TaskRepository<Task | null> {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Task | null> {
    const prismaTask = await this.prisma.task.findUnique({
      where: {id}
    });

    return prismaTask;
  }

  async create(task: Task): Promise<Task> {
    console.log(task);
    const prismaTask = await this.prisma.task.create({
      data: {
        message: task.message,
        userId: task.userId
      }
    });
    return prismaTask;
  }

  async update(task: Task): Promise<void> {}

  async callUserTasks(userId: string): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: {userId}
    });
  }

  async purge(): Promise<void> {
    await this.prisma.task.deleteMany();
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: {id}
    });
  }
}
