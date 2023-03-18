import casual from "casual";
import {PrismaClient} from "@prisma/client";
const {user} = new PrismaClient();

export async function main() {
  // let user1 = await user.create({
  //   data: {
  //     name: casual.name,
  //     email: casual.email,
  //     password: casual.password
  //   }
  // });
  // const user1 = await user.deleteMany();
  const user1 = await user.findMany();
  // const emailUser = "Wolf.Titus@yahoo.com";
  // const user1 = await user.findUnique({
  //   where: {email: emailUser}
  // });

  // const user2 = await user.findUnique({where: {id: `1d95f60e-2765-4324-9b0a-391bdf0d2f6c`}});
  console.log(user1);
  // console.log(user2);
  //   await user.deleteMany();
}
// main().catch((error) => console.error(error.message));
// .finally(async () => await prisma.$disconnect());
