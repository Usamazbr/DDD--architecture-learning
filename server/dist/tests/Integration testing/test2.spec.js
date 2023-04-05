import { PrismaClient } from "@prisma/client";
import { expect } from "chai";
import express from "express";
import request from "supertest";
describe("GET /users", () => {
    let prisma;
    let app;
    beforeEach(async () => {
        // Initialize the Prisma client
        prisma = new PrismaClient();
        // Seed the database with test data
        await prisma.user.createMany({
            data: [
                { name: "Alice", email: "alice@example.com", password: "something" },
                { name: "Bob", email: "bob@example.com", password: "something" }
            ]
        });
        // Initialize the Express app
        app = express();
        app.get("/users", async (req, res) => {
            const users = await prisma.user.findMany();
            res.json(users);
        });
    });
    afterEach(async () => {
        // Close the Prisma client
        await prisma.$disconnect();
    });
    it("should retrieve a list of users", async () => {
        // Send a GET request to the endpoint
        const response = await request(app).get("/users");
        // Verify that the response contains the expected data
        expect(response.status).to.equal(200);
        expect(response.body).to.equal([
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
        // Initialize the Express app
        app = express();
        app.post("/api/user/signup", async (req, res) => {
            // Seed the database with test data
            const user = await prisma.user.create({
                data: {
                    name: "Alice",
                    email: "alice@example.com",
                    password: "something"
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
        // Send a GET request to the endpoint
        const response = await request(app).post("/api/user/signup");
        // Verify that the response contains the expected data
        expect(response.status).to.equal(200);
        expect(response.body).to.equal({
            name: "Alice",
            email: "alice@example.com",
            password: "something"
        });
        return Promise.resolve();
    });
});
