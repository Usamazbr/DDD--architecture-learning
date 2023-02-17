import { Port1 } from "../../applicaion/gateways/ports/port.js";
class App {
    app;
    access;
    port;
    constructor(app, port_main) {
        this.port = port_main;
        this.app = app;
        this.access = new Port1(this.app);
    }
    start() {
        // mongoose.connect(process.env.DATABSE_CONNECT).then(() => {
        // console.log("connected to \x1b[34mMongoDb\x1b[0m");
        this.access.adapterMethod();
        this.app.listen(this.port, () => {
            console.log(`Server is running on port \x1b[33m${this.port}\x1b[0m`);
        });
        // })
        // .catch((err) => {
        //   console.log(err);
        // });
    }
}
export default App;
