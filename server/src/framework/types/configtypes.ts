import {ObjectId} from "mongodb";
// import {ObjectId} from "mongoose";

export interface Config {
  _id?: ObjectId;
  db_connect?: string;
  port: number;
  secret?: string;
}
