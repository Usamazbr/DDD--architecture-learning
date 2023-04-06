import {PrismaClient} from "@prisma/client";
import casual from "casual";
import {expect} from "chai";
import express, {Request, Response, Express} from "express";
import {describe, it} from "mocha";
import request from "supertest";

describe.only("should create, retrieve and delete a user", () => {
  let prisma: PrismaClient;
  let app: Express;
  let sampleUser: any;
  before(() => {
    // Initialize the Prisma client
    prisma = new PrismaClient();

    // Initialize the Express app
    app = express();

    // mock User
    sampleUser = {
      id: casual.uuid,
      name: casual.name,
      email: casual.email,
      password: casual.password
    };
  });

  // clean up
  after(async () => {
    // Close the Prisma client
    await prisma.$disconnect();
    // Deleting Sample User
    await prisma.user.delete({where: {id: sampleUser.id}});
  });

  beforeEach(async () => {
    await prisma.user.create({data: sampleUser});

    app.get("/api/user/:userId", async ({params: {userId}}: Request, res: Response) => {
      const users = await prisma.user.findUnique({where: {id: userId}});
      res.json(users);
    });
  });

  it("should retrieve a user", async () => {
    // Send a GET request to the endpoint
    const response = await request(app).get(`/api/user/${sampleUser.id}`);

    // Verify that the response contains the expected data
    expect(response.status).to.equal(200);
    expect(response.body.name).to.equal(sampleUser.name);
    expect(response.body.email).to.equal(sampleUser.email);
    expect(response.body.password).to.equal(sampleUser.password);
  });
});