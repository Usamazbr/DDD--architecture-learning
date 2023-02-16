import express from "express";
export class HelloWorldController {
    router = express.Router();
    constructor() {
        this.router.get("/", this.firstMessage);
    }
    firstMessage = (request, response) => {
        response.send("Hi, mom");
    };
}
