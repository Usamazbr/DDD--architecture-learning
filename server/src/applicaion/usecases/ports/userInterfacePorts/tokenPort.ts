import {Token, tokenDTO} from "./types/typesToken.js";

export abstract class TokenFactory {
  /**
   * tokenFactory
   */
  public abstract tokenMethod(): Token;

  public createToken(id: string, time: string): tokenDTO {
    // Call the factory method to create a Product object.
    const token = this.tokenMethod();
    // Now, use the product.
    return token.tokenGenerator(id, time);
  }

  public verifyToken(req: any, res: any, next: any): void {
    // Call the factory method to create a Product object.
    const token = this.tokenMethod();
    // Now, use the product.
    token.tokenVerifier(req, res, next);
  }
}
