import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import {MongoClient, ObjectId} from "mongodb";

export const PORT_T = Number(process.env.PORT);

const config_db = <string>process.env.CONFIG_DB;
const config_id = process.env.DEVELOPMENT;

const dbName = "config";
const collectionName = "DDD_config";

export async function fetchConfig(): Promise<any> {
  let config;
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(config_db);

    console.log("\nconnected to \x1b[34mconfig MongoDb\x1b[0m");

    const client = await MongoClient.connect(config_db);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const query = {_id: new ObjectId(config_id)};
    config = await collection.findOne(query);

    client.close();

    // console.log(config);
    return config;
  } catch (error) {
    console.log(error);
    return error;
  }
}
