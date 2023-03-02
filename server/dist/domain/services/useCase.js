import fs from 'fs';
import util from 'util';
const readFile = util.promisify(fs.readFile);
export class UseCase {
    async getUsers() {
        const fileData = await readFile("./src/domain/entities/users.json", "utf-8");
        const data = JSON.parse(fileData);
        // console.log("\x1b[33madminControl line 22:\x1b[0m ");
        // console.log(data);
        return data;
    }
}
