import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import App from "./interface/frontendController/App.js";
const expApp = express();
const server = new App(expApp, Number(process.env.PORT), String(process.env.DATABSE_CONNECT));
// app.listen();
server.start();
