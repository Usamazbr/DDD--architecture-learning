import express from "express";
import mongoose from 'mongoose';
import cors from 'cors'
import * as dotenv from "dotenv";
dotenv.config();

import App from "./interface/frontendController/App.js";

const expApp = express()

const server = new App(expApp, Number(process.env.PORT));
// app.listen();

server.start();