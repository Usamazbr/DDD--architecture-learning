import {TokenFactory} from "../../applicaion/ports/userInterfacePorts/tokenPort.js";
import {TaskRepository} from "../repos/taskRepository/taskRepos.js";
// interface bodyType {
//   email: string;
//   password: string;
// }

export class TaskUseCase<T> {
  constructor(private Token: TokenFactory, private UserRepos: TaskRepository<T>) {}

  public async signupUser(name: string, email: string): Promise<any> {}

  /**
   * fetchAllUsers
   */
  public async fetchAllUsers(): Promise<T[]> {
    const users = await this.UserRepos.callAll();
    return <T[]>users;
  }

  public async loginUser(email: string, password: string): Promise<any> {
    console.log(email);
    console.log(password);
  }

  /**
   * delUser
   */
  public async delUser(id: string) {
    await this.UserRepos.delete(id);
  }
}
