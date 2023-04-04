import {Types} from "mongoose";
// import {ObjectId} from "mongoose";

export interface Config {
  _id?: Types.ObjectId;
  db_connect?: string;
  port: number;
  secret?: string;
}
