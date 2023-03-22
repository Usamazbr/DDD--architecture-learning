export class TaskUseCase {
    TaskRepos;
    constructor(TaskRepos) {
        this.TaskRepos = TaskRepos;
    }
    /**
     * fetchAllUsers
     */
    async fetchAllTasks(id) {
        const tasks = await this.TaskRepos.callUserTasks(id);
        return tasks;
    }
    /**
     * delUser
     */
    async delTask(id) {
        await this.TaskRepos.delete(id);
    }
    /**
     * createTask
     */
    async createTask(userId, message) {
        const task = await this.TaskRepos.create({ userId, message });
        return task;
    }
}
