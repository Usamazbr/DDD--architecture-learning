import { taskController } from "../../applicaion/controllers/taskController.js";
import { userController } from "../../applicaion/controllers/userController.js";
class App {
    app;
    config;
    userAccess;
    taskAccess;
    constructor(app, config) {
        this.app = app;
        this.config = config;
        this.userAccess = new userController(this.app, this.config);
        this.taskAccess = new taskController(this.app, this.config);
    }
    //TODO user
    async start() {
        try {
            await this.userAccess.authMethod();
            await this.taskAccess.taskMethod();
            this.app.listen(this.config.port, () => {
                console.log(`Server_1 is running on port \x1b[33m${this.config.port}\x1b[0m`);
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}
export default App;
