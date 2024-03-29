import express, { Application } from "express";
import { Port1 } from "./applicaion/gateways/ports/port.js";

class App {
  private app: Application;

  private access: Port1
  private port : number;

  constructor(app: Application,port_1: number) {
    this.port = port_1
    this.app = app;
    this.access = new Port1(this.app)

  }

  public start() {
    // mongoose.connect('mongodb://localhost:27017/myDatabase').then(() => {
    this.access.adapterMethod()
    this.app.listen(this.port, () => {
      console.log('Server is running on port 3000');
    });
    // })
  // .catch((err) => {
  //   console.log(err);
  // });
  }
}

export default App;
