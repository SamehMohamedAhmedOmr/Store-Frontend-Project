import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  ENVIRONMENT,

  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,

  POSTGRES_HOST_TESTING,
  POSTGRES_DB_TESTING,
  POSTGRES_USERNAME_TESTING,
  POSTGRES_PASSWORD_TESTING,
} = process.env;

let DB: Pool;

if (ENVIRONMENT == 'dev') {
  DB = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
  });
} else {
  DB = new Pool({
    host: POSTGRES_HOST_TESTING,
    database: POSTGRES_DB_TESTING,
    user: POSTGRES_USERNAME_TESTING,
    password: POSTGRES_PASSWORD_TESTING,
  });
}

export default DB;
