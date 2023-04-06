import casual from "casual";
import nodemailer from "nodemailer";

import {EncryptFactory} from "../ports/userInterfacePorts/encryptionPort.js";
import {TokenFactory} from "../ports/userInterfacePorts/tokenPort.js";
import {UserRepository} from "../../domain/repos/userRespository/userRepos.js";
import {User, UserManager, UserObserver} from "../../domain/entities/types/typesUser.js";

import {InvalidUserDataError, PasswordEncryptionError, UnAuthorizedError} from "../../framework/errors/errorHandler.js";

export class AuthUseCase<T> implements UserManager<T> {
  user!: T;
  observers: UserObserver<T>[] = [];
  constructor(
    private tokenAdapter: TokenFactory,
    public Encrypt: EncryptFactory,
    public UserRepos: UserRepository<T>
  ) {}

  /**
   * loginUser
   */
  public async loginUser(email: string, password: string) {
    console.log(email);
    console.log(password);

    if (!email || !password) {
      throw new InvalidUserDataError(400, "All fields must be filled");
    }
    const userDTO = await (<Promise<User>>this.UserRepos.findByEmail(email));
    if (!userDTO) {
      throw new InvalidUserDataError(400, "Incorrect email");
    }
    const tokenDTO = this.tokenAdapter.createToken(<string>userDTO.id, null);
    // compare hash
    const compareBool: boolean = await this.Encrypt.compareEncryptionOperation(
      password,
      <string>userDTO.password?.toString()
    );
    // console.log(compareBool);
    if (!compareBool) {
      throw new UnAuthorizedError(400, "Incorrect password");
    }

    // res.status(200).json({ email, token: tokenDTO.token});
    return {user: userDTO, token: <string>tokenDTO.token};
  }

  /**
   * delUser
   */
  public async delUser(id: string) {
    await this.UserRepos.delete(id);
  }

  /**
   * SignUpUser
   */
  public async signupUser(name: string, email: string) {
    const unhashedNew = casual.password;
    console.log(unhashedNew);
    const hashDTO = await this.Encrypt.encryptionOperation(unhashedNew);
    if (!hashDTO || !hashDTO.hashed) {
      throw new PasswordEncryptionError(400, "Encryption failed");
    }
    const {hashed, level} = hashDTO;

    const newUser = await this.UserRepos.create(<T>{name, email, password: hashed});
    console.log(newUser);
    const userDTO = {...(<T>newUser), password: unhashedNew, level};
    this.user = <T>userDTO;
    this.notifyObservers();

    return <T>newUser;
  }

  /**
   * fetchAllUsers
   */
  public async fetchAllUsers() {
    const users = await this.UserRepos.callAll();
    return <T[]>users;
  }

  registerObserver(observer: UserObserver<T>) {
    this.observers.push(observer);
  }

  unregisterObserver(observer: UserObserver<T>) {
    const index = this.observers.findIndex((o) => o === observer);
    if (index >= 0) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.onUpdate(this));
  }
}

// Observer implementation (Email driver is here)
export class MyUserObserver<T> implements UserObserver<T> {
  public onUpdate(subject: UserManager<T>) {
    if (subject instanceof AuthUseCase) {
      // email notifier
      const transport = nodemailer.createTransport({
        // service: "",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.TEST_APP_EMAIL,
          pass: process.env.TEST_APP_PSWD
        }
      });
      const message = {
        from: process.env.TEST_APP_EMAIL, // Sender address
        to: subject.user.email, // List of recipients
        subject: "Your credentials for Todo App", // Subject line
        html: `<h2>Email: ${subject.user.email}<br/>Password: ${subject.user.password}</h2><br/><br/><p>Please don't share this with anyone</p>` // Plain text body
      };
      transport.sendMail(message, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info.response);
        }
      });
      console.log(<T>subject.user);
      console.log(`Observation: Email sent`);
    }
  }
}
