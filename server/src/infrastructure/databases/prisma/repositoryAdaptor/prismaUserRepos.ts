import {PrismaClient, User} from "@prisma/client";
import {UserRepository} from "../../../../domain/repos/userRespository/userRepos.js";

export class PrismaORMUserRepository implements UserRepository<User | null> {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const prismaUser = this.prisma.user.findUnique({
      where: {id}
    });

    return prismaUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = this.prisma.user.findUnique({
      where: {email}
    });

    return prismaUser;
  }

  async create(user: User): Promise<User> {
    const prismaUser = await this.prisma.user.upsert({
      where: {id: user.id},
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

  async update(user: User): Promise<void> {}

  async callAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async delete(id: string): Promise<void> {}
}
