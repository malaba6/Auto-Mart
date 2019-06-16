// import pool from "./migration"
import Debug from "debug";
import { Pool } from "pg";
import dotenv from "dotenv";


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


export const createTables = () => {
    const users = `
        CREATE TABLE IF NOT EXISTS
            users (
                id TEXT PRIMARY KEY,
                firstname VARCHAR(120) NOT NULL,
                lastname VARCHAR(120) NOT NULL,
                email VARCHAR(120) UNIQUE NOT NULL,
                password VARCHAR(120) NOT NULL,
                address VARCHAR(120),
                isadmin BOOLEAN
            )`;
    const cars = `
        CREATE TABLE IF NOT EXISTS
            cars (
                id UUID PRIMARY KEY,
                ownerid UUID NOT NULL,
                createdon VARCHAR(120) NOT NULL,
                state VARCHAR(120) NOT NULL,
                status VARCHAR(120) NOT NULL,
                manufacturer VARCHAR(120) NOT NULL,
                model VARCHAR(120) NOT NULL,
                price  float8 NOT NULL,
                photo VARCHAR(120) NOT NULL
            )`;
    const orders = `
        CREATE TABLE IF NOT EXISTS
            orders (
                id UUID PRIMARY KEY,
                ownerid UUID NOT NULL,
                createdon TEXT NOT NULL,
                carid UUID NOT NULL,
                status TEXT NOT NULL,
                price float8 NOT NULL,
                offeredprice float8 NOT NULL
            )`;
    const flags = `
        CREATE TABLE IF NOT EXISTS
            flags (
                id UUID PRIMARY KEY,
                carid UUID NOT NULL,
                reason TEXT NOT NULL,
                description TEXT NOT NULL
            )`;

    pool.query(users)
        .then((res) => {
            debug(res);
        })
        .catch((err) => {
            debug(err);
        });

    pool.query(cars)
        .then((res) => {
            debug(res);
        })
        .catch((err) => {
            debug(err);
        });

    pool.query(orders)
        .then((res) => {
            debug(res);
        })
        .catch((err) => {
            debug(err);
        });

    pool.query(flags)
        .then((res) => {
            debug(res);
        })
        .catch((err) => {
            debug(err);
            pool.end();
        });
}

require("make-runnable");