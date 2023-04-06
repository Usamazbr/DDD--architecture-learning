// import {PrismaClient} from "@prisma/client";
// import {expect} from "chai";
// import express, {Request, Response} from "express";
// import request from "supertest";
export {};
// describe.skip("GET /users", () => {
//   let prisma: PrismaClient;
//   let app: any;
//   beforeEach(async () => {
//     // Initialize the Prisma client
//     prisma = new PrismaClient();
//     // Seed the database with test data
//     await prisma.user.createMany({
//       data: [
//         {name: "Alice", email: "alice@example.com", password: "something"},
//         {name: "Bob", email: "bob@example.com", password: "something"}
//       ]
//     });
//     // Initialize the Express app
//     app = express();
//     app.get("/users", async (req: Request, res: Response) => {
//       const users = await prisma.user.findMany();
//       res.json(users);
//     });
//   });
//   afterEach(async () => {
//     // Close the Prisma client
//     await prisma.$disconnect();
//   });
//   it("should retrieve a list of users", async () => {
//     // Send a GET request to the endpoint
//     const response = await request(app).get("/users");
//     // Verify that the response contains the expected data
//     expect(response.status).to.equal(200);
//     expect(response.body).to.equal([
//       {name: "Alice", email: "alice@example.com", password: "something"},
//       {name: "Bob", email: "bob@example.com", password: "something"}
//     ]);
//   });
// });
// describe.skip("Create a user", () => {
//   let prisma: PrismaClient;
//   let app: any;
//   beforeEach(async () => {
//     // Initialize the Prisma client
//     prisma = new PrismaClient();
//     // Initialize the Express app
//     app = express();
//     app.post("/api/user/signup", async (req: Request, res: Response) => {
//       // Seed the database with test data
//       const user = await prisma.user.create({
//         data: {
//           name: "Alice",
//           email: "alice@example.com",
//           password: "something",
//           createdAt: new Date("2023-04-05T12:15:38.307Z"),
//           id: "1234"
//         }
//       });
//       res.json(user);
//     });
//   });
//   afterEach(async () => {
//     // Close the Prisma client
//     await prisma.$disconnect();
//   });
//   it("should retrieve a list of users", async () => {
//     // Send a GET request to the endpoint
//     const response = await request(app).post("/api/user/signup");
//     // Verify that the response contains the expected data
//     expect(response.status).to.equal(200);
//     expect(response.body).to.equal({
//       name: "Alice",
//       email: "alice@example.com",
//       createdAt: new Date("2023-04-05T12:15:38.307Z"),
//       id: "1234"
//     });
//   });
// });
