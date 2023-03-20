import { testAdapter } from "../../applicaion/controllers/testAdapter.js";
export class TestApp {
    app;
    config;
    access;
    constructor(app, config) {
        this.app = app;
        this.config = config;
        this.access = new testAdapter(this.app);
    }
    //? Test App
    startTest() {
        try {
            this.access.adapterMethod();
            this.app.listen(this.config.port, () => {
                console.log(`Server_test is running on port \x1b[33m${this.config.port}\x1b[0m`);
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}
