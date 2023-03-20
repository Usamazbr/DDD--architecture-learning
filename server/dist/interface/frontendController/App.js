import { userController } from "../../applicaion/controllers/userController.js";
class App {
    app;
    config;
    userAccess;
    // private connectionDb: ConnecPrisma;
    constructor(app, config) {
        this.app = app;
        this.config = config;
        // this.connectionDb = new ConnecPrisma(<string>this.config.db_connect);
        this.userAccess = new userController(this.app, this.config.db_connect);
    }
    //TODO user
    async start() {
        try {
            // const repos = await this.connectionDb.connectionMethod();
            await this.userAccess.authMethod();
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
