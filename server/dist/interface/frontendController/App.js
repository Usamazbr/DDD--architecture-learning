import mongoose from 'mongoose';
import { Adapter1 } from "../../applicaion/controllers/adapter.js";
class App {
    app;
    port;
    mongoCreds;
    access;
    constructor(app, port, mongoCreds) {
        this.app = app;
        this.port = port;
        this.mongoCreds = mongoCreds;
        this.access = new Adapter1(this.app);
    }
    start() {
        mongoose.set('strictQuery', true);
        mongoose.connect(this.mongoCreds).then(() => {
            console.log("\nconnected to \x1b[34mMongoDb\x1b[0m");
            this.access.adapterMethod();
            this.app.listen(this.port, () => {
                console.log(`Server is running on port \x1b[33m${this.port}\x1b[0m`);
            });
        })
            .catch((err) => {
            console.log(err);
        });
    }
}
export default App;
