import {PrismaClient} from "@prisma/client";
import casual from "casual";
import {expect} from "chai";
import express, {Request, Response, Express} from "express";
import {describe, it} from "mocha";
import request from "supertest";
import sinon from "sinon";

describe.skip("Create User", () => {
  let prisma: PrismaClient;
  let app: Express;
  let sampleUser: any;
  before(() => {
    // Initialize the Prisma client
    prisma = new PrismaClient();

    // Initialize the Express app
    app = express();

    // mock User
    const date = new Date();
    sampleUser = {
      id: casual.uuid,
      // createdAt: date.toISOString(),
      // updatedAt: date.toISOString(),
      name: casual.name,
      email: casual.email,
      password: casual.password
    };
  });
  after(async () => {
    // Close the Prisma client
    await prisma.$disconnect();
    // Deleting Sample User
    await prisma.user.delete({where: {id: sampleUser.id}});
  });

  beforeEach(async () => {
    app.get("/api/user/:userId", async ({params: {userId}}: Request, res: Response) => {
      const users = await prisma.user.findUnique({where: {id: userId}});
      res.json(users);
    });
  });

  it("should create, retrieve and delete a user", async () => {
    // Stub the prisma.user.create method
    const prismaCreateStub = sinon.stub(prisma.user, "create").resolves(sampleUser);
    await prismaCreateStub({data: sampleUser});

    // Spy on the prisma.user.findUnique method
    const prismaFindUniqueSpy = sinon.spy(prisma.user, "findUnique");

    // Send a GET request to the endpoint
    const response = await request(app).get(`/api/user/${sampleUser.id}`);

    // Verify that the response contains the expected data
    expect(prismaFindUniqueSpy.calledOnce).to.be.true;
    expect(response.status).to.equal(200);
    expect(response.body.name).to.equal(sampleUser.name);
    expect(response.body.email).to.equal(sampleUser.email);
    expect(response.body.password).to.equal(sampleUser.password);
  });
});
