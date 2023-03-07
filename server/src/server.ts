import express from "express";
import cors from 'cors'
import * as dotenv from "dotenv";
dotenv.config();

import App from "./interface/frontendController/App.js";

const expApp = express()
expApp.use(cors({}));

const testServer = new App(expApp, Number(process.env.PORT), String(process.env.DATABSE_CONNECT));
// app.listen();

testServer.startTest();

const server2 = new App(expApp, Number(process.env.PORT_2), String(process.env.DATABSE_CONNECT));

server2.start()