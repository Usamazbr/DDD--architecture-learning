import {PrismaClient} from "@prisma/client";
import {Connect} from "../../../../domain/repos/connection/userDbPort.js";
import {PrismaORMUserRepository} from "../repositoryAdaptor/prismaUserRepos.js";
// import {UserRepository} from "../../../../domain/repos/userRespository/userRepos.js";

export class ConnecPrisma extends Connect {
  constructor(private DB_Address: string) {
    super();
  }
  public async connectionMethod(): Promise<void> {
    try {
      console.log(`Prisma method invoked`);

      const userRepository = new PrismaORMUserRepository(new PrismaClient());
      // console.log(await userRepository.findById(`4483453d-c7e5-4b58-977d-8d0d0871fc7e`));
      // console.log(await userRepository.callAll());

      console.log("\nconnected to \x1b[34mPrisma\x1b[0m");
    } catch (err) {
      console.error(`Data Source initialization error`, err);
    }
  }
}
