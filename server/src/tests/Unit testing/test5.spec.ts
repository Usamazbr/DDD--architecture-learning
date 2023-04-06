import {PrismaClient} from "@prisma/client";
import {expect} from "chai";
import express, {Request, Response, Express} from "express";
import {describe, it} from "mocha";
import request from "supertest";

describe("GET /users", () => {
  let prisma: PrismaClient;
  let app: Express;
  before(() => {
    // Initialize the Prisma client
    prisma = new PrismaClient();

    // Initialize the Express app
    app = express();
  });
  after(async () => {
    // Close the Prisma client
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Seed the database with test data
    await prisma.user.createMany({
      data: [
        {name: "Alice", email: "alice@example.com", password: "something"},
        {name: "Bob", email: "bob@example.com", password: "something"}
      ]
    });

    app.get("/users", async (req: Request, res: Response) => {
      const users = await prisma.user.findMany();
      res.json(users);
    });
  });

  it("should retrieve a list of users", async () => {
    // Send a GET request to the endpoint
    const response = await request(app).get("/users");

    // Verify that the response contains the expected data
    expect(response.status).to.equal(200);
    expect(response.body).to.equal([
      {name: "Alice", email: "alice@example.com", password: "something"},
      {name: "Bob", email: "bob@example.com", password: "something"}
    ]);
  });
});

describe.skip("Create a user", () => {
  let prisma: PrismaClient;
  let app: Express;

  beforeEach(async () => {
    // Initialize the Prisma client
    prisma = new PrismaClient();

    // Seed the database with test data
    await prisma.user.create({
      data: {
        name: "Alice",
        email: "alice@example.com",
        password: "something",
        // createdAt: new Date("2023-04-05T12:15:38.307Z"),
        id: "1234"
      }
    });

    // Initialize the Express app
    app = express();
    app.get("/api/user/:userId", async ({params: {userId}}: Request, res: Response) => {
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });
      res.json(user);
    });
  });

  afterEach(async () => {
    // Close the Prisma client
    await prisma.$disconnect();
  });

  it("should retrieve a list of users", async () => {
    let response: {status: number; body: any} = {status: 404, body: {}};
    try {
      // Send a GET request to the endpoint
      response = await request(app).get("/api/user/1234");
    } catch (error) {
      console.log(error);
    }

    // Verify that the response contains the expected data
    expect(response.status).to.equal(200);
    expect(response.body).to.equal({
      name: "Alice",
      email: "alice@example.com",
      createdAt: new Date("2023-04-05T12:15:38.307Z"),
      id: "1234"
    });
  });
});
