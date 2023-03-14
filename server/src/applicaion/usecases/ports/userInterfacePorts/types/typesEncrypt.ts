export interface encryptDTO {
  hashed: string;
  level: number;
}

export interface Encryption {
  encryption(password: string): Promise<encryptDTO>;
  compare(password: string, hash: string): Promise<boolean>;
}
