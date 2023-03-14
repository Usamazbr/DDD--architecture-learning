import { uuid } from "uuidv4";
import { EmailValueObject } from "../valueObjects/emailValueObject.js";
import { NameValueObject } from "../valueObjects/nameValueObject.js";
import { PasswordValueObject } from "../valueObjects/passwordValueObject.js";
// User Entity
export class UserEntity {
    id;
    name;
    email;
    password;
    constructor(name, email, password) {
        this.id = uuid();
        this.name = new NameValueObject(name);
        this.email = new EmailValueObject(email);
        this.password = new PasswordValueObject(password);
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    updateName(name) {
        this.name = new NameValueObject(name);
    }
    updateEmail(email) {
        this.email = new EmailValueObject(email);
    }
    updatePassword(password) {
        this.password = new PasswordValueObject(password);
    }
    toDTO() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password
        };
    }
}