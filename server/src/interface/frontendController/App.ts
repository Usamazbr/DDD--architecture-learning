import express, { Application } from "express";
import mongoose from 'mongoose'
import { Adapter1 } from "../../applicaion/controllers/adapter.js";

class App {

  private access: Adapter1

  constructor(private app: Application,private port: number, private mongoCreds:string) {
    this.access = new Adapter1(this.app)
  }

  public start() {
    mongoose.set('strictQuery', true);
    mongoose.connect(this.mongoCreds).then(() => {
    console.log("\nconnected to \x1b[34mMongoDb\x1b[0m");
    this.access.adapterMethod()
    this.app.listen(this.port, () => {
      console.log(`Server is running on port \x1b[33m${this.port}\x1b[0m`);
    });
    })
  .catch((err:string) => {
    console.log(err);
  });
  }
}

export default App;
