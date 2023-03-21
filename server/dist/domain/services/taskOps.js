export class TaskUseCase {
    Token;
    TaskRepos;
    constructor(Token, TaskRepos) {
        this.Token = Token;
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
}
