class NameValueObject {
  private readonly name: string;

  constructor(name: string) {
    if (name.length < 2 || name.length > 50) {
      throw new Error("Name must be between 2 and 50 characters");
    }

    this.name = name;
  }

  public toString(): string {
    return this.name;
  }
}

export {NameValueObject};
