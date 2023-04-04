import {EmailValueObject} from "../../valueObjects/emailValueObject.js";
import {NameValueObject} from "../../valueObjects/nameValueObject.js";
import {PasswordValueObject} from "../../valueObjects/passwordValueObject.js";

export interface User {
  id?: string;
  name: NameValueObject;
  email: EmailValueObject;
  password: PasswordValueObject;
  createdAt?: string;
  updatedAt?: string;
}
export interface UserManager<T> {
  signupUser(name: string, email: string): Promise<T>;
  loginUser(email: string, password: string): Promise<any>;
  delUser(id: string): Promise<void>;
  fetchAllUsers(): Promise<T[]>;
  registerObserver(observer: UserObserver<T>): void;
  unregisterObserver(observer: UserObserver<T>): void;
  notifyObservers(): void;
}

export interface UserObserver<T> {
  onUpdate(subject: UserManager<T>): void;
}
