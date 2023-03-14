import {EmailValueObject} from "../../valueObjects/emailValueObject.js";
import {NameValueObject} from "../../valueObjects/nameValueObject.js";
import {PasswordValueObject} from "../../valueObjects/passwordValueObject.js";

export interface User {
  id: string;
  name: NameValueObject;
  email: EmailValueObject;
  password: PasswordValueObject;
}
