class EmailValueObject {
  private readonly email: string;

  constructor(email: string) {
    if (!this.validateEmail(email)) {
      throw new Error("Invalid email address");
    }

    this.email = email;
  }

  public toString(): string {
    return this.email;
  }

  private validateEmail(email: string): boolean {
    // Simple email validation regex
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }
}

export {EmailValueObject};
