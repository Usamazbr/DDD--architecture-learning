import {JwtPayload} from "jsonwebtoken";

export interface tokenDTO {
  token: String;
  expiryTime: Date;
}

export interface Token {
  secretOut(): string;
  tokenGenerator(_id: string, time: string): tokenDTO;
  tokenVerifier(token: string): string;
}
