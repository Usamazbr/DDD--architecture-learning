import express from "express";
import cors from "cors";
import { fetchConfig, PORT_T } from "./framework/config/config.js";
import App from "./interface/frontendController/App.js";
import { TestApp } from "./interface/frontendController/testApp.js";
// import {main} from "./infrastructure/databases/prisma/testPrismaRepos.js";
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
    const configuration = await fetchConfig();
    // console.log(configuration);
    const server2 = new App(expApp, configuration);
    await server2.start();
};
mainApp().catch((error) => console.log(error.message));
