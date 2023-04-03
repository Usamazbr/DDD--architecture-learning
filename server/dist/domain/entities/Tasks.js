import { uuid } from "uuidv4";
// User Entity
export class TaskEntity {
    message;
    userId;
    id;
    constructor(message, userId) {
        this.message = message;
        this.userId = userId;
        this.id = uuid();
    }
    toDTO() {
        return {
            id: this.id,
            message: this.message,
            userId: this.userId
        };
    }
}
