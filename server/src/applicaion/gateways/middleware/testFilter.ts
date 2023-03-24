// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");
// import jwt from "jsonwebtoken";
// import {fetchConfig} from "../../../framework/config/config.js";
// import {Config} from "../../../types/configtypes.js";
import {JwtAdapter} from "../../controllers/userAdapters/jwtAdapter.js";
import {TokenFactory} from "../../ports/userInterfacePorts/tokenPort.js";

export class TaskFilter {
  //   private header: any;
  constructor(private tokenAdapter: TokenFactory) {}

  /**
   * filterMethod
   */
  public filterMethod({headers}: any, res: any, next: any): void {
    // console.log("\x1b[33mline 26:\x1b[0m ");
    // console.log(this);
    console.log(`filterMethod`);
    const {authorization} = headers;
    if (!authorization) {
      return res.status(401).json({error: "Token required"});
    }
    const token: string = authorization.split(" ")[1];
    console.log("\x1b[33mline 24:\x1b[0m ");
    console.log(token);
    this.tokenAdapter.secretKey();
    try {
      // this.tokenAdapter.verifyToken(token);

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({error: "Unauthorized"});
    }
  }

  /**
   * bsmethod
   */
  public bsmethod() {
    console.log(this.tokenAdapter.secretKey());
  }
}

// User token authentication
export const tasksFilter = (req: any, res: any, next: any) => {
  // console.log("\x1b[33mline 26:\x1b[0m ");
  // console.log(body);
  const tokenAdapter1 = new JwtAdapter(<string>process.env.SECRET);
  console.log(`filterMethod`);
  const {authorization} = req.headers;
  if (!authorization) {
    return res.status(401).json({error: "Token required"});
  }
  const token: string = authorization.split(" ")[1];
  // this.tokenAdapter.secretKey();
  try {
    req.user = tokenAdapter1.verifyToken(token);

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({error: "Unauthorized"});
  }
};
