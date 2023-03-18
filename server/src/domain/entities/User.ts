import {uuid} from "uuidv4";
import {User} from "./types/typesUser.js";
import {EmailValueObject} from "../valueObjects/emailValueObject.js";
import {NameValueObject} from "../valueObjects/nameValueObject.js";
import {PasswordValueObject} from "../valueObjects/passwordValueObject.js";

// User Entity
export class UserEntity implements User {
  public readonly id: string;
  public name: NameValueObject;
  public email: EmailValueObject;
  public password: PasswordValueObject;

  constructor(name: string, email: string, password: string) {
    this.id = uuid();
    this.name = new NameValueObject(name);
    this.email = new EmailValueObject(email);
    this.password = new PasswordValueObject(password);
  }

  public toDTO(): User {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password
    };
  }
}
