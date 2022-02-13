import dotenv from 'dotenv'
import {Pool} from 'pg'

dotenv.config()

const {
    ENVIRONMENT,

    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USERNAME,
    POSTGRES_PASSWORD,

    POSTGRES_HOST_DEVELOPMENT,
    POSTGRES_DB_DEVELOPMENT,
    POSTGRES_USERNAME_DEVELOPMENT,
    POSTGRES_PASSWORD_DEVELOPMENT,


    POSTGRES_HOST_TESTING,
    POSTGRES_DB_TESTING,
    POSTGRES_USERNAME_TESTING,
    POSTGRES_PASSWORD_TESTING,

} = process.env

let DB: Pool;

if (ENVIRONMENT == 'test') {
    DB = new Pool({
        host: POSTGRES_HOST_TESTING,
        database: POSTGRES_DB_TESTING,
        user: POSTGRES_USERNAME_TESTING,
        password: POSTGRES_PASSWORD_TESTING,
    });
} else if (ENVIRONMENT == 'dev') {
    DB = new Pool({
        host: POSTGRES_HOST_DEVELOPMENT,
        database: POSTGRES_DB_DEVELOPMENT,
        user: POSTGRES_USERNAME_DEVELOPMENT,
        password: POSTGRES_PASSWORD_DEVELOPMENT,
    });
}
else {
    DB = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USERNAME,
        password: POSTGRES_PASSWORD,
    });
}


export default DB;
