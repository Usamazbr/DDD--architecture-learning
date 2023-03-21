import {PrismaClient, User} from "@prisma/client";
import {Connect} from "../../../../domain/repos/connection/userDbPort.js";

export class ConnecPrisma extends Connect {
  private client: PrismaClient;
  constructor(private DB_Address: string) {
    super();
    this.client = new PrismaClient();
  }
  public connectionMethod(): PrismaClient | unknown {
    try {
      console.log(`Prisma method invoked`);

      const connection = this.client;

      console.log("\nconnected to \x1b[34mPrisma\x1b[0m");
      return connection;
    } catch (err) {
      console.error(`Data Source initialization error`, err);
      return err;
    }
  }
}
