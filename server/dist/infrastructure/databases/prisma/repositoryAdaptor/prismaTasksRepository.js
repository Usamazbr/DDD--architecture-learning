export class PrismaORMTaskRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const prismaUser = await this.prisma.user.findUnique({
            where: { id }
        });
        return prismaUser;
    }
    async create(user) {
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
    async update(user) { }
    async callAll() {
        return await this.prisma.user.findMany();
    }
    async purge() {
        await this.prisma.user.deleteMany();
    }
    async delete(id) {
        await this.prisma.user.delete({
            where: { id }
        });
    }
}
