import {PrismaClient, Task} from "@prisma/client";
import {TaskRepository} from "../../../../domain/repos/taskRepository/taskRepos.js";
// import { Task } from "../../../../domain/entities/types/typesTasks.js";

export class PrismaORMTaskRepository implements TaskRepository<Task | null> {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Task | null> {
    const prismaTask: unknown = await this.prisma.task.findUnique({
      where: {id}
    });

    return <Task>prismaTask;
  }

  async create(task: Task): Promise<Task> {
    console.log(task);
    const prismaTask: unknown = await this.prisma.task.create({
      data: {
        message: task.message,
        userId: task.userId
      }
    });
    return <Task>prismaTask;
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

  async delete(id: string): Promise<any> {
    return await this.prisma.task.delete({
      where: {id}
    });
  }
}
