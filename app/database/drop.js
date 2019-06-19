import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let DATABASE_URL;

if (process.env.NODE_ENV === "test") {
    DATABASE_URL = process.env.DATABASE_URL_TEST;
} else {
    DATABASE_URL = process.env.DATABASE_URL;
}

const pool = new Pool({
    connectionString: DATABASE_URL
});

pool.on('connect', () => {});

export const dropTables = async() => {
    const queries = `
            DROP TABLE IF EXISTS users CASCADE;
            DROP TABLE IF EXISTS cars CASCADE;
            DROP TABLE IF EXISTS orders CASCADE;
            DROP TABLE IF EXISTS flags CASCADE;`;
    const drop = await pool.query(queries);
    return drop;
}

dropTables().then((result) => {}).catch((error) => {
    return err;
});