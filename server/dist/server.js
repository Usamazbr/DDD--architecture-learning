import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import App from "./App.js";
const expApp = express();
const server = new App(expApp, Number(process.env.PORT));
// app.listen();
server.start();
