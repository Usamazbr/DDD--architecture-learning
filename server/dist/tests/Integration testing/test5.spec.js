import { PrismaClient } from "@prisma/client";
import { expect } from "chai";
import express from "express";
import { describe, it } from "mocha";
import request from "supertest";
describe.only("Fetching all users", () => {
    let prisma;
    let app;
    before(() => {
        // Initialize the Prisma client
        prisma = new PrismaClient();
        // Initialize the Express app
        app = express();
    });
    after(async () => {
        // Close the Prisma client
        await prisma.$disconnect();
        // Deleting Sample User
        await prisma.user.deleteMany({ where: { email: { in: [`alice@example.com`, `bob@example.com`] } } });
    });
    beforeEach(async () => {
        // Seed the database with test data
        await prisma.user.createMany({
            data: [
                { name: "Alice", email: "alice@example.com", password: "something" },
                { name: "Bob", email: "bob@example.com", password: "something" }
            ]
        });
        app.get("/users", async (req, res) => {
            const users = await prisma.user.findMany();
            res.json(users);
        });
    });
    it("should retrieve a list of users", async () => {
        // Send a GET request to the endpoint
        const response = await request(app).get("/users");
        let responseObj = response.body.filter((obj) => {
            return obj.name === `Alice` || obj.name === `Bob`;
        });
        responseObj = responseObj.map((obj) => {
            const obj2 = obj;
            delete obj2.createdAt;
            delete obj2.id;
            delete obj2.updatedAt;
            return obj2;
        });
        console.log(responseObj);
        // Verify that the response contains the expected data
        expect(response.status).to.equal(200);
        expect(responseObj).to.deep.equal([
            { name: "Alice", email: "alice@example.com", password: "something" },
            { name: "Bob", email: "bob@example.com", password: "something" }
        ]);
    });
});
describe.skip("Create a user", () => {
    let prisma;
    let app;
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
        app.get("/api/user/:userId", async ({ params: { userId } }, res) => {
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
        let response = { status: 404, body: {} };
        try {
            // Send a GET request to the endpoint
            response = await request(app).get("/api/user/1234");
        }
        catch (error) {
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
