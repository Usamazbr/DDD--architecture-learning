// import { UseCase } from '../../../domain/services/useCase.js';
// import { Application} from 'express';

export interface Token {
  tokenGenerator(): string;
  tokenVerifier<T, U>(req: T, res: U, next: undefined): Promise<any>;
}

export interface Encryption {
  operation(): string;
}

//TODO Authenticator
export abstract class TokenFactory {
  /**
   * tokenFactory
   */
  public abstract tokenMethod(_id: string): Token;

  public createToken(id: string): string {
    // Call the factory method to create a Product object.
    const token = this.tokenMethod(id);
    // Now, use the product.
    return `Creator: The same creator's code has just worked with ${token.tokenGenerator()}`;
  }
}

export abstract class EncryptFactory {
  /**
   * encryptionFactory
   */
  public abstract encryptionMethod(): Encryption;

  public someOperation(): string {
    // Call the factory method to create a Product object.
    const encryption = this.encryptionMethod();
    // Now, use the product.
    return `Creator: The same creator's code has just worked with ${encryption.operation()}`;
  }
}
