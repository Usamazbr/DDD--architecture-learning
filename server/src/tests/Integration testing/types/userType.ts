export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(name: string, email: string, password: string, id?: string, createdAt?: string, updatedAt?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
