import { DataSource } from "typeorm";
import { UserEntity } from "../../../../domain/entities/User.js";
import { Connect } from "../../../../domain/repos/connection/userDbPort.js";
export class ConnectTypeORM extends Connect {
    DB_Address;
    constructor(DB_Address) {
        super();
        this.DB_Address = DB_Address;
    }
    connectionMethod() {
        const dataSource = new DataSource({
            type: `mongodb`,
            url: this.DB_Address,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            synchronize: true,
            logging: true,
            entities: [UserEntity]
        });
        dataSource.initialize();
    }
}
