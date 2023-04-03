// import { Task } from "../../../../domain/entities/types/typesTasks.js";
export class PrismaORMTaskRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const prismaTask = await this.prisma.task.findUnique({
            where: { id }
        });
        return prismaTask;
    }
    async create(task) {
        console.log(task);
        const prismaTask = await this.prisma.task.create({
            data: {
                message: task.message,
                userId: task.userId
            }
        });
        return prismaTask;
    }
    async update(task) { }
    async callUserTasks(userId) {
        return await this.prisma.task.findMany({
            where: { userId }
        });
    }
    async purge() {
        await this.prisma.task.deleteMany();
    }
    async delete(id) {
        return await this.prisma.task.delete({
            where: { id }
        });
    }
}
