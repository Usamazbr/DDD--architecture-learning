import fs from 'fs'
import util from 'util'
const readFile = util.promisify(fs.readFile);

export class UseCase {
  public async getUsers(): Promise<object[]> {
    const fileData = await readFile("./src/domain/entities/users.json", "utf-8")
    const data: object[] = JSON.parse(fileData);
    // console.log("\x1b[33madminControl line 22:\x1b[0m ");
    // console.log(data);
    return data
  }
}