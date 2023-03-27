// import passport from "passport-jwt";
export {};
// import jwt from "jsonwebtoken";
// import {TokenFactory} from "../../ports/userInterfacePorts/tokenPort.js";
// import {Token} from "../../ports/userInterfacePorts/types/typesToken.js";
// class PassportToken implements Token {
//   constructor(private secret: string) {
//     // console.log(this.secret);
//   }
//   /**
//    * secretOut
//    */
//   public secretOut() {
//     return this.secret;
//   }
//   /**
//    * tokenGenerator
//    */
//   public tokenGenerator(_id: string, time: string | null) {
//     const expiryTime = new Date();
//     if (time === null) {
//       console.log(`time is 1 day (default)`);
//       time = `1d`;
//       expiryTime.setDate(expiryTime.getDate() + 1);
//     }
//     const token = passport.sign({_id}, this.secret, {expiresIn: time});
//     return {token, expiryTime};
//   }
//   /**
//    * tokenVerifier
//    */
//   public tokenVerifier = (token: string) => {
//     try {
//       const {_id} = passport.verify(token, this.secret) as passport.JwtPayload;
//       return _id;
//       // req.user = await User.findOne({ _id });
//     } catch (error) {
//       console.log("\x1b[33mline 41:\x1b[0m ");
//       console.log(error);
//       return `${error}: Unauthorized`;
//       // res.status(401).json({error: "Unauthorized"});
//     }
//   };
// }
// export class JwtAdapter extends TokenFactory {
//   constructor(private secret: string) {
//     super();
//   }
//   /**
//    * encryptionMethod
//    */
//   public tokenMethod(): Token {
//     // this.createToken()
//     return new PassportToken(this.secret);
//   }
// }
