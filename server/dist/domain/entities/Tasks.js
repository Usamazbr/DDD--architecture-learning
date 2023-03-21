import { uuid } from "uuidv4";
// User Entity
export class TaskEntity {
    task;
    id;
    constructor(task) {
        this.task = task;
        this.id = uuid();
    }
    toDTO() {
        return {
            id: this.id,
            task: this.task
        };
    }
}
