import Debug from "debug";
import dotenv from "dotenv";
import { Pool } from "pg";


dotenv.config();

let DATABASE_URL;
let debug = Debug('http');

if (process.env.NODE_ENV === "TEST") {
    DATABASE_URL = process.env.DATABASE_URL_TEST;
} else {
    DATABASE_URL = process.env.DATABASE_URL;
}

const pool = new Pool({ connectionString: DATABASE_URL });

pool.on('connect', () => {
    debug("connected to the database");
    console.log("Connected to " + DATABASE_URL);
});

pool.on('remove', () => {
    console.log('client removerd');
    process.exit(0);
});

pool.on('error', () => {
    console.log('could not connect to the database');
});

export default pool;