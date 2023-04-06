export class User {
    id;
    name;
    email;
    password;
    createdAt;
    updatedAt;
    constructor(name, email, password, id, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
