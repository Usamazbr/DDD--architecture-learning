import {Token, tokenDTO} from "./types/typesToken.js";

export abstract class TokenFactory {
  /**
   * tokenFactory
   */
  public abstract tokenMethod(): Token;

  /**
   * secretKey
   */
  public secretKey() {
    const tokenAdapter = this.tokenMethod();
    return tokenAdapter.secretOut();
  }

  public createToken(id: string, time: string | null): tokenDTO {
    // Call the factory method to create a Product object.
    const tokenAdapter = this.tokenMethod();
    // Now, use the product.
    return tokenAdapter.tokenGenerator(id, <string>time);
  }

  public verifyToken(token: string): void {
    console.log(token);
    // Call the factory method to create a Product object.
    const tokenAdapter = this.tokenMethod();
    // Now, use the product.
    tokenAdapter.tokenVerifier(token);
  }
}
