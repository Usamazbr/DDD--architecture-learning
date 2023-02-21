import express, { Application } from "express";
import mongoose from 'mongoose'
import { Port1 } from "../../applicaion/controllers/adapter.js";

class App {

  private access: Port1

  constructor(private app: Application,private port: number, private mongoCreds:string) {
    this.access = new Port1(this.app)
  }

  public start() {
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
