import express from "express";
import cors from "cors";
import { fetchConfig, PORT_T } from "./framework/config/config.js";
import App from "./interface/frontendController/App.js";
import { main } from "./domain/repos/testRepos.js";
const expApp = express();
expApp.use(cors({}));
const configuration = { port: PORT_T };
const testServer = new App(expApp, configuration);
// app.listen();
testServer.startTest();
//TODO Main App
const mainApp = async () => {
    const configuration = await fetchConfig();
    // console.log(configuration);
    const server2 = new App(expApp, configuration);
    main().catch((error) => console.error(error.message));
    server2.start();
};
mainApp().catch((error) => console.log(error.message));
