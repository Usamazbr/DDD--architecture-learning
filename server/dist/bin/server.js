import express from "express";
import cors from "cors";
import { PORT_T } from "../framework/config/config.js";
import App from "../interface/frontendController/App.js";
import { TestApp } from "../interface/frontendController/testApp.js";
// import {Config} from "../types/configtypes.js";
// import program from "commander";
const expApp = express();
//middlewares
expApp.use(express.json());
expApp.use(cors({}));
//? Test App
const configuration = { port: PORT_T };
const testServer = new TestApp(expApp, configuration);
testServer.startTest();
//TODO Main App
const mainApp = async () => {
    // const configuration: Config = await fetchConfig();
    // switching mongodb config to env config
    const configuration = {
        port: Number(process.env.S_PORT),
        db_connect: process.env.DB_CONNECT,
        secret: process.env.SECRET
    };
    // console.log(configuration);
    const server = new App(expApp, configuration);
    await server.start();
};
mainApp().catch((error) => console.log(error.message));
