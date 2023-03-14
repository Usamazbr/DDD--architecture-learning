// import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {TokenFactory} from "../../usecases/ports/userInterfacePorts/tokenPort.js";
import {Token} from "../../usecases/ports/userInterfacePorts/types/typesToken.js";

class JwtToken implements Token {
  /**
   * tokenGenerator
   */
  public tokenGenerator(_id: string, time: string) {
    const expiryTime = new Date();
    expiryTime.setDate(expiryTime.getDate() + 1);
    const token = jwt.sign({_id}, String(process.env.SECRET), {expiresIn: time});
    return {token, expiryTime};
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
  /**
   * encryptionMethod
   */
  public tokenMethod(): Token {
    // this.createToken()
    return new JwtToken();
  }
}
