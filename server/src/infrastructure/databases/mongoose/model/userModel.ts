import {Document, model, Schema} from "mongoose";

// create a schema
interface User extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

// create a model
module.exports = model<User>("User", userSchema);
