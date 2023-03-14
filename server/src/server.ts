import express from "express";
import cors from "cors";
import {fetchConfig, PORT_T} from "./framework/config/config.js";

import App from "./interface/frontendController/App.js";
import {Config} from "./types/configtypes.js";

const expApp = express();
expApp.use(cors({}));
const configuration: Config = {port: PORT_T};
const testServer = new App(expApp, configuration);
// app.listen();

testServer.startTest();

//TODO Main App
const mainApp = async () => {
  const configuration: Config = await fetchConfig();
  // console.log(configuration);
  const server2 = new App(expApp, configuration);

  server2.start();
};

mainApp();
