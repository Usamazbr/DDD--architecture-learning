// import {User} from "@prisma/client";
import casual from "casual";
// import request from "supertest";
import {AuthUseCase} from "../applicaion/services/userOps.js";
// import app from '../../src/.bin/server.js';

// describe("something", () => {
//   it("does something");
// });

import {expect} from "chai";
import sinon from "sinon";
// import {TokenFactory} from "../applicaion/ports/userInterfacePorts/tokenPort.js";
// import {EncryptFactory} from "../applicaion/ports/userInterfacePorts/encryptionPort.js";
// import {UserRepository} from "../domain/repos/userRespository/userRepos.js";
import {PrismaORMUserRepository} from "../infrastructure/databases/prisma/repositoryAdaptor/prismaUserRepos.js";
import {JwtAdapter} from "../interface/frontendController/userAdapters/jwtAdapter.js";
import {BcryptAdapter} from "../interface/frontendController/userAdapters/bcryptAdapter.js";

// describe("AuthUseCase", () => {
//   let authUseCase: AuthUseCase<any>;
//   let tokenAdapter: JwtAdapter;
//   let encrypt: BcryptAdapter;
//   let userRepos: PrismaORMUserRepository;

//   beforeEach(() => {
//     tokenAdapter = sinon.createStubInstance(JwtAdapter);
//     encrypt = sinon.createStubInstance(BcryptAdapter);
//     userRepos = sinon.createStubInstance(PrismaORMUserRepository);

//     authUseCase = new AuthUseCase(tokenAdapter, encrypt, userRepos);
//   });

//   describe("signupUser", () => {
//     it("should create a user with a hashed password", async () => {
//       const name = casual.name;
//       const email = casual.email;
//       const password = casual.password;
//       const hashedPassword = "myhashedpassword";
//       const level = 10;

//       sinon.stub(authUseCase.UserRepos, "create").resolves({name, email, password, level});

//       sinon.stub(authUseCase.Encrypt, "encryptionOperation").resolves({hashed: hashedPassword, level});

//       const user = await authUseCase.signupUser(name, email);

//       expect(user.name).to.equal(name);
//       expect(user.email).to.equal(email);
//       expect(user.password).to.equal(hashedPassword);
//     });
//   });

//   describe("fetchAllUsers", () => {
//     it("should return all users", async () => {
//       const users = [
//         {id: "1", name: "Alice", email: "alice@example.com"},
//         {id: "2", name: "Bob", email: "bob@example.com"}
//       ];
//       sinon.stub(authUseCase.UserRepos, "callAll").resolves(users);

//       const result = await authUseCase.fetchAllUsers();

//       expect(result).to.deep.equal(users);
//     });
//   });
// });
// describe("AuthUseCase", () => {
//   describe("signupUser", () => {
//     beforeEach(() => {});
//     it("should create a new user with a hashed password", async () => {
//       const mockUserRepository = sinon.createStubInstance(PrismaORMUserRepository);
//       // const mockTokenFactory = { createToken: sinon.stub().returns({ token: 'mock_token' }) };
//       const mockTokenFactory = sinon.createStubInstance(JwtAdapter);
//       const mockEncryptFactory = sinon.createStubInstance(BcryptAdapter);
//       // const mockEncryptFactory = { encryptionOperation: sinon.stub().returns({ hashed: 'mock_hash', level: 10 }), compareEncryptionOperation: sinon.stub().returns(true) };
//       const authUseCase = new AuthUseCase(mockTokenFactory, mockEncryptFactory, mockUserRepository);

//       const createUserStub = <sinon.SinonStub>mockUserRepository.create;
//       createUserStub.resolves({id: "mock_id", name: "John Doe", email: "john.doe@example.com", password: "mock_hash"});

//       const user = await authUseCase.signupUser("John Doe", "john.doe@example.com");

//       expect(createUserStub.calledOnce).to.be.true;
//       expect(user).to.deep.equal({
//         id: "mock_id",
//         name: "John Doe",
//         email: "john.doe@example.com",
//         password: "mock_hash"
//       });
//       expect(mockEncryptFactory.encryptionOperation.calledOnceWith("mock_password")).to.be.true;
//       expect(mockTokenFactory.createToken.calledOnceWith("mock_id", null)).to.be.true;
//     });
//   });
// });

describe.skip("fetchAllUsers", () => {
  it("should return all users", async () => {
    const mockUserRepository = sinon.createStubInstance(PrismaORMUserRepository);
    // const mockTokenFactory = { createToken: sinon.stub().returns({ token: 'mock_token' }) };
    const mockTokenFactory = sinon.createStubInstance(JwtAdapter);
    const mockEncryptFactory = sinon.createStubInstance(BcryptAdapter);
    // const mockEncryptFactory = { encryptionOperation: sinon.stub().returns({ hashed: 'mock_hash', level: 10 }), compareEncryptionOperation: sinon.stub().returns(true) };
    const authUseCase = new AuthUseCase(mockTokenFactory, mockEncryptFactory, mockUserRepository);

    const mock = sinon.mock(authUseCase);

    const expectation = mock.expects(`fetchAllUsers`);

    expectation.exactly(1);

    mock.verify();

    // const createUserStub = <sinon.SinonStub>mockUserRepository.callAll;

    // expect(createUserStub).to.be.false;
  });
});

// describe('loginUser', () => {
//   it('should throw an error if email or password is missing', async () => {
//     await expect(authUseCase.loginUser('', '')).to.be.rejectedWith('All fields must be filled');
//     await expect(authUseCase.loginUser('test@example.com', '')).to.be.rejectedWith('All fields must be filled');
//     await expect(authUseCase.loginUser('', 'mypassword')).to.be.rejectedWith('All fields must be filled');
//   });

//   it('should throw an error if the email is incorrect', async () => {
//     const email = 'test@example.com';
//     sinon.stub(authUseCase.UserRepos, 'findByEmail').resolves(null);

//     await expect(authUseCase.loginUser(email, 'mypassword')).to.be.rejectedWith('Incorrect email');
//   });

//   it('should throw an error if the password is incorrect', async () => {
//     const email = 'test@example.com';
//     const password = 'mypassword';
//     const hashedPassword = 'myhashedpassword';

//     sinon.stub(authUseCase.UserRepos, 'findByEmail').resolves({ email, password: hashedPassword });
//     sinon.stub(authUseCase.Encrypt, 'compareEncryptionOperation').resolves(false);

//     await expect(authUseCase.loginUser(email, password)).to.be.rejectedWith('Incorrect password');
//   });

//   it('should return a user and token if the email and password

// describe('GET /', () => {
//     beforeEach(()=>{})
//   it('should return "Hello, world!"', (done) => {
//     request(app)
//       .get('/')
//       .expect(200)
//       .end((_: any, res: { text: any; }) => {
//         expect(res.text).to.equal('Hello, world!');
//         done();
//       });
//   });
// });

// describe('GET /', () => {
//   it('should return "Hello, world!"', (done) => {
//     request(app)
//       .get('/')
//       .expect(200)
//       .end((err, res) => {
//         expect(res.text).to.equal('Hello, world!');
//         done();
//       });
//   });
// });

// describe('GET / with stub', () => {
//   it('should return "Hello, world!" using stub', async () => {
//     const getStub = stub().returns('Hello, world!');

//     app.get('/', getStub);

//     const res = await request(app).get('/');

//     expect(getStub.calledOnce).to.be.true;
//     expect(res.text).to.equal('Hello, world!');
//   });
// });
