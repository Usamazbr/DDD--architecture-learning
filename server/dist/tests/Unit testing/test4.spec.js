import { expect } from "chai";
import sinon from "sinon";
import { PrismaClient } from "@prisma/client";
describe("Mocking Prisma ORM", () => {
    let db;
    let findUniqueStub;
    let sampleUser;
    before(() => {
        db = new PrismaClient();
        sampleUser = {
            id: "1",
            createdAt: new Date(),
            updatedAt: new Date(),
            name: "John Doe",
            email: "johndoe@example.com",
            password: "password"
        };
    });
    after(async () => {
        // findUniqueStub.restore();
        // Close the Prisma client
        await db.$disconnect();
    });
    it("should return a user object", async () => {
        findUniqueStub = sinon
            .stub(db.user, "findUnique")
            .withArgs({ where: { id: "1" } })
            .resolves(sampleUser);
        const user = await db.user.findUnique({ where: { id: "1" } });
        console.log(user);
        expect(user).to.be.equal(sampleUser);
    });
});
