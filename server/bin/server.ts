import express from "express";
import cors from "cors";
import {fetchConfig, PORT_T} from "../src/framework/config/config.js";

import App from "../src/interface/frontendController/App.js";
import {Config} from "../src/types/configtypes.js";
import {main} from "../src/infrastructure/databases/prisma/testPrismaRepos";

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
  main().catch((e) => console.error(e));
  // .finally(async () => await prisma.$disconnect());

  await server2.start();
};

mainApp().catch((error) => console.log(error.message));
