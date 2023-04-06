import { PrismaClient } from "@prisma/client";
export class PrismaTestClass {
    db;
    constructor() {
        this.db = new PrismaClient();
    }
    /**
     * findUser
     */
    async findUser(id) {
        return await this.db.user.findUnique({ where: { id } });
    }
}
