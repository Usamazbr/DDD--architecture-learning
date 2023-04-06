import {PrismaClient} from "@prisma/client";

export class PrismaTestClass {
  db: PrismaClient;
  constructor() {
    this.db = new PrismaClient();
  }
  /**
   * findUser
   */
  public async findUser(id: string) {
    return await this.db.user.findUnique({where: {id}});
  }
}
