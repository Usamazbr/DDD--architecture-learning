import express from "express";

export class HelloWorldController {
    public router = express.Router();
  
    constructor() {
      this.router.get("/", this.firstMessage);
    }
  
    private firstMessage = (request: express.Request, response: express.Response) => {
      response.send("Hi, mom");
    };
  }