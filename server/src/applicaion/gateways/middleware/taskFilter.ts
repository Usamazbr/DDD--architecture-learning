import {JwtAdapter} from "../../controllers/userAdapters/jwtAdapter.js";
import {TokenFactory} from "../../ports/userInterfacePorts/tokenPort.js";

// User token authentication
export class TaskFilter {
  private tokenAdapter: TokenFactory;
  //   private header: any;
  constructor(private secret: string) {
    this.tokenAdapter = new JwtAdapter(this.secret);
  }

  /**
   * filterMethod
   */
  public filterMethod = (req: any, res: any, next: any) => {
    const {authorization} = req.headers;
    if (!authorization) {
      return res.status(401).json({error: "Token required"});
    }
    const token: string = authorization.split(" ")[1];
    try {
      req.user = this.tokenAdapter.verifyToken(token);

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({error: "Unauthorized"});
    }
  };
}
