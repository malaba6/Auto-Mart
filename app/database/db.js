import { Pool } from 'pg';
import dotenv from 'dotenv';

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

export default {
    /**
     * DB Query
     * @param {object} req
     * @param {object} res
     * @returns {object} object 
     */
    query(text, params) {
        return new Promise((resolve, reject) => {
            pool.query(text, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}