import {uuid} from "uuidv4";
import {Task} from "./types/typesTasks.js";

// User Entity
export class TaskEntity implements Task {
  public readonly id: string;

  constructor(public message: string, public userId: string) {
    this.id = uuid();
  }

  public toDTO(): Task {
    return {
      id: this.id,
      message: this.message,
      userId: this.userId
    };
  }
}
