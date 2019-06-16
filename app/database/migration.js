import Debug from "debug";
import { Pool } from "pg";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";


dotenv.config();
let debug = Debug('postgres');

let DATABASE_URL;

if (process.env.NODE_ENV === "TEST") {
    DATABASE_URL = process.env.DATABASE_URL_TEST;
} else {
    DATABASE_URL = process.env.DATABASE_URL;
}

const pool = new Pool({
    connectionString: DATABASE_URL
});

pool.on('connect', () => {
    debug('connected to the db');
});

const adminPass = bcrypt.hashSync(process.env.ADMIN_PASS, 8);


export const createTables = async() => {
    try {
        const users = `
        CREATE TABLE IF NOT EXISTS
            users (
                id UUID PRIMARY KEY,
                firstname VARCHAR(120) NOT NULL,
                lastname VARCHAR(120) NOT NULL,
                email VARCHAR(120) UNIQUE NOT NULL,
                password VARCHAR(120) NOT NULL,
                address VARCHAR(120),
                isadmin BOOLEAN
            );
        CREATE TABLE IF NOT EXISTS
            cars (
                id UUID PRIMARY KEY,
                ownerid UUID NOT NULL,
                createdon VARCHAR(120) NOT NULL,
                state VARCHAR(120) NOT NULL,
                status VARCHAR(120) NOT NULL,
                type VARCHAR(120) NOT NULL,
                manufacturer VARCHAR(120) NOT NULL,
                model VARCHAR(120) NOT NULL,
                price  float8 NOT NULL,
                photo VARCHAR(120) NOT NULL,
                FOREIGN KEY(ownerid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
            );
        CREATE TABLE IF NOT EXISTS
            orders (
                id UUID PRIMARY KEY,
                ownerid UUID NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
                createdon TEXT NOT NULL,
                carid UUID NOT NULL REFERENCES cars(id) ON UPDATE CASCADE ON DELETE CASCADE,
                status VARCHAR(120) NOT NULL,
                price float8 NOT NULL,
                offeredprice float8 NOT NULL
            );
        CREATE TABLE IF NOT EXISTS
            flags (
                id UUID PRIMARY KEY,
                ownerid UUID NOT NULL,
                carid UUID NOT NULL,
                reason VARCHAR(200) NOT NULL,
                description TEXT NOT NULL,
                FOREIGN KEY(ownerid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
            );
        INSERT INTO 
        users (id, firstName, lastName, email, password, address, isAdmin)
        VALUES('7bfc05ce-c15c-433c-be5f-69687e6b9369', 'admin', 'admin',
         'admin@automart.com', '${adminPass}', 'Kigali', true);`;

        const tables = await pool.query(users);
        debug(tables);
        pool.end();
    } catch (err) {
        debug(err);
        await pool.end()
    }
}

// require("make-runnable");
createTables();