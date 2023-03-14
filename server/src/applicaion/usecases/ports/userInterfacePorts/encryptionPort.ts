import {encryptDTO, Encryption} from "./types/typesEncrypt.js";

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
