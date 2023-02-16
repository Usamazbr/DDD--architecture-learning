import { Port1 } from "./applicaion/gateways/ports/port.js";
class App {
    app;
    access;
    port;
    constructor(app, port_1) {
        this.port = port_1;
        this.app = app;
        this.access = new Port1(this.app);
    }
    start() {
        // mongoose.connect('mongodb://localhost:27017/myDatabase').then(() => {
        this.access.adapterMethod();
        this.app.listen(this.port, () => {
            console.log('Server is running on port 3000');
        });
        // })
        // .catch((err) => {
        //   console.log(err);
        // });
    }
}
export default App;
