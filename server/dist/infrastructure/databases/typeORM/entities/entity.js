var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ObjectId } from "mongodb";
import { Entity, Column, ObjectIdColumn } from "typeorm";
import { uuid } from "uuidv4";
let UserEntity = class UserEntity {
    constructor(name, email, password) {
        this._id = new ObjectId(uuid());
        this.name = name;
        this.email = email;
        this.password = password;
    }
    _id;
    name;
    email;
    password;
};
__decorate([
    ObjectIdColumn()
], UserEntity.prototype, "_id", void 0);
__decorate([
    Column()
], UserEntity.prototype, "name", void 0);
__decorate([
    Column()
], UserEntity.prototype, "email", void 0);
__decorate([
    Column()
], UserEntity.prototype, "password", void 0);
UserEntity = __decorate([
    Entity()
], UserEntity);
export { UserEntity };
