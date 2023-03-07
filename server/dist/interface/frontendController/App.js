import mongoose from 'mongoose';
import { testAdapter } from "../../applicaion/controllers/adapter.js";
import { userController } from "../../applicaion/controllers/userController.js";
class App {
    app;
    port;
    mongoCreds;
    access;
    userAccess;
    constructor(app, port, mongoCreds) {
        this.app = app;
        this.port = port;
        this.mongoCreds = mongoCreds;
        this.access = new testAdapter(this.app);
        this.userAccess = new userController(this.app);
    }
    //? Test App
    startTest() {
        try {
            this.access.adapterMethod();
            this.app.listen(this.port, () => {
                console.log(`Server_test is running on port \x1b[33m${this.port}\x1b[0m`);
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    //TODO user
    start() {
        mongoose.set('strictQuery', true);
        mongoose.connect(this.mongoCreds).then(() => {
            console.log("\nconnected to \x1b[34mMongoDb\x1b[0m");
            this.userAccess.adapterMethod();
            this.app.listen(this.port, () => {
                console.log(`Server_1 is running on port \x1b[33m${this.port}\x1b[0m`);
            });
        })
            .catch((err) => {
            console.log(err);
        });
    }
}
export default App;
