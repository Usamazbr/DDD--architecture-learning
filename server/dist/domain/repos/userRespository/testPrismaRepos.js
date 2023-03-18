import { PrismaClient } from "@prisma/client";
const { user } = new PrismaClient();
export async function main() {
    //   let user1 = await user.create({
    //     data: {
    //       name: casual.name,
    //       email: casual.email,
    //       password: casual.password
    //     }
    //   });
    //   const user1 = await user.deleteMany();
    const user1 = await user.findMany();
    console.log(user1);
    //   await user.deleteMany();
}
// main().catch((error) => console.error(error.message));
// .finally(async () => await prisma.$disconnect());
