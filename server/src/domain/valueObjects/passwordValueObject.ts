class PasswordValueObject {
  private readonly password: string;

  constructor(password: string) {
    if (password.length < 8 || password.length > 50) {
      throw new Error("Password must be between 8 and 50 characters");
    }

    this.password = password;
  }

  public toString(): string {
    return this.password;
  }
}

export {PasswordValueObject};
