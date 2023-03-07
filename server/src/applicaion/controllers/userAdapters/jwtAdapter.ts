// import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {Token, TokenFactory} from "../../usecases/ports/port2.js";

class JwtToken implements Token {
  private _id: string;

  constructor(private id: string) {
    this._id = id;
  }

  /**
   * tokenGenerator
   */
  public tokenGenerator(): string {
    return jwt.sign({_id: this._id}, String(process.env.SECRET), {expiresIn: "1d"});
  }

  /**
   * tokenVerifier
   */
  public tokenVerifier = async (req: any, res: any, next: any) => {
    const {authorization} = req.headers;

    if (!authorization) {
      return res.status(401).json({error: "Token required"});
    }
    const token = authorization.split(" ")[1];

    try {
      // const { _id } = jwt.verify(token, String(process.env.SECRET));

      // req.user = await User.findOne({ _id });

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({error: "Unauthorized"});
    }
  };
}

export class JwtAdapter extends TokenFactory {
  constructor() {
    super();
  }

  /**
   * encryptionMethod
   */
  public tokenMethod(_id: string): Token {
    // this.createToken()
    return new JwtToken(_id);
  }
}
