// import { UseCase } from '../../../domain/services/useCase.js';
// import { Application} from 'express';

interface tokenDTO {
  token: String;
  expiryTime: Date;
}

interface encryptDTO {
  hashed: string;
  level: number;
}

export interface Token {
  tokenGenerator(_id: string, time: string): tokenDTO;
  tokenVerifier<T, U>(req: T, res: U, next: undefined): Promise<any>;
}

export interface Encryption {
  encryption(password: string): Promise<encryptDTO>;
  compare(password: string, hash: string): Promise<boolean>;
}

//TODO Authenticator
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

export abstract class EncryptFactory {
  /**
   * encryptionFactory
   */
  public abstract encryptionMethod(): Encryption;

  public encryptionOperation(password: string): Promise<encryptDTO> {
    // Call the factory method to create a Product object.
    const encryption = this.encryptionMethod();
    // Now, use the product.
    return encryption.encryption(password);
  }

  public compareEncryptionOperation(password: string, hashed: string): Promise<boolean> {
    // Call the factory method to create a Product object.
    const encryption = this.encryptionMethod();
    // Now, use the product.
    return encryption.compare(password, hashed);
  }
}
