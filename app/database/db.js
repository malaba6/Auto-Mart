import pool from "./migration"
import Debug from "debug";

let debug = Debug('http');

export const createTables = () => {
    try {
        const users = `
        CREATE TABLE IF NOT EXISTS
            users (
                id UUID PRIMARY KEY,      
                email VARCHAR(128) UNIQUE NOT NULL,
                first_name VARCHAR(128) NOT NULL,
                last_name VARCHAR(128) NOT NULL,
                password VARCHAR(128) NOT NULL,
                address VARCHAR (128),
                is_admin BOOLEAN
            )`;
        const cars = `
        CREATE TABLE IF NOT EXISTS
            cars (
                id UUID PRIMARY KEY,
                created_on VARCHAR(200) NOT NULL,
                state VARCHAR(20) NOT NULL,
                status VARCHAR(20) NOT NULL,
                price  NOT NULL,

            )`;
        const orders = `
            CREATE TABLE IF NOT EXISTS
                orders (
                    car VARCHAR(128) NOT NULL,
                    id SERIAL PRIMARY KEY,      
                    model VARCHAR(128) UNIQUE NOT NULL,
                    type VARCHAR(128) NOT NULL
                )`;

        // const queries = `${users};${cars};${orders}`;

        pool.query(users, (err, res) => {
            console.log(err, res);
            // pool.end();
        });

        pool.query(cars, (err, res) => {
            console.log(err, res);
            // pool.end();
        });

        pool.query(orders, (err, res) => {
            console.log(err, res);
            // pool.end();
        });
    } catch (err) {
        console.log("Couldn't connect to the database");
    }
}

require("make-runnable");