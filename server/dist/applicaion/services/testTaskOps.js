export class TaskServices {
    TaskRepos;
    constructor(TaskRepos) {
        this.TaskRepos = TaskRepos;
    }
    tasks = [];
    observers = [];
    /**
     * createTask
     */
    async createTask(userId, message) {
        if (!message) {
            throw Error("Message must be something!");
        }
        // this.tasks.push(task);
        const task = await this.TaskRepos.create({ userId, message });
        this.notifyObservers();
        return task;
    }
    /**
     * delUser
     */
    async delTask(id) {
        const index = this.tasks.findIndex((t) => t.id === id);
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
    async fetchAllTasks(id) {
        const tasks = await this.TaskRepos.callUserTasks(id);
        console.log(tasks);
        // this.notifyObservers();
        return tasks;
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
            console.log(`Tasks updated! ${subject.tasks}`);
        }
    }
}
