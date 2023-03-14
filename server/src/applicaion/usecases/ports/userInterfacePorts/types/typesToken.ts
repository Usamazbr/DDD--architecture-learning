export interface tokenDTO {
  token: String;
  expiryTime: Date;
}

export interface Token {
  tokenGenerator(_id: string, time: string): tokenDTO;
  tokenVerifier<T, U>(req: T, res: U, next: undefined): Promise<any>;
}
