import { DataSource } from "typeorm";
import { UserEntity } from "../../../../domain/entities/User.js";
import { Connect } from "../../../../domain/repos/connection/userDbPort.js";
export class ConnectTypeORM extends Connect {
    DB_Address;
    constructor(DB_Address) {
        super();
        this.DB_Address = DB_Address;
    }
    async connectionMethod() {
        const dataSource = new DataSource({
            type: `mongodb`,
            url: this.DB_Address,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            synchronize: true,
            logging: true,
            entities: [UserEntity]
        });
        try {
            console.log(`typeORM method invoked`);
            const connection = await dataSource.initialize();
            console.log(connection);
            console.log("\nconnected to \x1b[34mTypeORM\x1b[0m");
            return connection;
        }
        catch (err) {
            console.error(`Data Source initialization error`, err);
        }
    }
}
