export class PrismaORMUserRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const prismaUser = this.prisma.user.findUnique({
            where: { id }
        });
        return prismaUser;
    }
    async findByEmail(email) {
        const prismaUser = this.prisma.user.findUnique({
            where: { email }
        });
        return prismaUser;
    }
    async create(user) {
        const prismaUser = await this.prisma.user.upsert({
            where: { id: user.id },
            update: {
                name: user.name,
                email: user.email
                // other fields to update
            },
            create: {
                id: user.id,
                name: user.name,
                email: user.email
                // other fields to create
            }
        });
        return prismaUser;
    }
    async update(user) { }
    async callAll() {
        return await this.prisma.user.findMany();
    }
    async delete(id) { }
}
