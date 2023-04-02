import { expect } from "chai";
import sinon from "sinon";
import { Class1 } from "./testClasses/Class1.js";
import { TestAuthUseCase } from "./testClasses/Class2.js";
import { PrismaORMUserRepository } from "../infrastructure/databases/prisma/repositoryAdaptor/prismaUserRepos.js";
describe.skip(`testMethod`, () => {
    let firstObj;
    //   let secondObj: any;
    beforeEach(() => {
        firstObj = new Class1();
        // secondObj = new Class1();
    });
    it(`Stub method`, () => {
        const stub = sinon.stub(firstObj, `testAdd`);
        stub.withArgs(1, 2).onFirstCall().returns(5);
        // .onSecondCall().returns(234);
        expect(firstObj.testMethod1(1, 2)).to.be.equal(5);
        // expect(firstObj.testMethod1(1, 2)).to.be.equal(3);
    });
});
describe("AuthUseCase", () => {
    describe("signupUser", () => {
        it("should create a new user with a hashed password", async () => {
            const mockUserRepository = sinon.createStubInstance(PrismaORMUserRepository);
            const mockTokenFactory = { createToken: sinon.stub().returns({ token: "mock_token" }) };
            const mockEncryptFactory = {
                encryptionOperation: sinon.stub().returns({ hashed: "mock_hash", level: 10 }),
                compareEncryptionOperation: sinon.stub().returns(true)
            };
            const authUseCase = new TestAuthUseCase(mockTokenFactory, mockEncryptFactory, mockUserRepository);
            const createUserStub = mockUserRepository.create;
            createUserStub.resolves({ id: "mock_id", name: "John Doe", email: "john.doe@example.com", password: "mock_hash" });
            const user = await authUseCase.signupUser("John Doe", "john.doe@example.com");
            expect(createUserStub.calledOnce).to.be.true;
            expect(user).to.deep.equal({
                id: "mock_id",
                name: "John Doe",
                email: "john.doe@example.com",
                password: "mock_hash"
            });
            expect(mockEncryptFactory.encryptionOperation.calledOnceWith("mock_password")).to.be.false;
            expect(mockTokenFactory.createToken.calledOnceWith("mock_id", null)).to.be.false;
        });
    });
});
