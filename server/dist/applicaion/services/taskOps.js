import { EmptyTodoError } from "../../framework/errors/errorHandler.js";
export class TaskServices {
    TaskRepos;
    tasks = [];
    observers = [];
    constructor(TaskRepos) {
        this.TaskRepos = TaskRepos;
    }
    /**
     * createTask
     */
    async createTask(userId, message) {
        if (!message) {
            throw new EmptyTodoError(400, "Message must be something!");
        }
        const task = await this.TaskRepos.create({ userId, message });
        this.tasks.push(task);
        this.notifyObservers();
        return task;
    }
    /**
     * delUser
     */
    async delTask(id) {
        const index = this.tasks.findIndex((t) => t.id === id);
        console.log(index);
        if (index >= 0) {
            this.tasks.splice(index, 1);
            const task = await this.TaskRepos.delete(id);
            this.notifyObservers();
            return task;
        }
        return {};
    }
    /**
     * fetchAllUsers standalone
     */
    async fetchAllTasks(userId) {
        const userTasks = await this.TaskRepos.callUserTasks(userId);
        // console.log(userTasks);
        this.tasks = userTasks;
        // this.notifyObservers();
        return userTasks;
    }
    registerObserver(observer) {
        this.observers.push(observer);
    }
    unregisterObserver(observer) {
        const index = this.observers.findIndex((o) => o === observer);
        if (index >= 0) {
            this.observers.splice(index, 1);
        }
    }
    notifyObservers() {
        this.observers.forEach((observer) => observer.onTaskUpdate(this));
    }
}
// Observer implementation
export class MyTaskObserver {
    onTaskUpdate(subject) {
        if (subject instanceof TaskServices) {
            console.log(`Observation: Tasks updated!`);
            subject.tasks.map(({ message }) => console.log(message));
        }
    }
}
