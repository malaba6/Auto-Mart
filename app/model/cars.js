import moment from 'moment';
import uuid from 'uuid';
import db from "../database/db";

class Car {
    /**
     *
     * @param {object} data
     * @returns {object} car object
     */
    async postCar(data, owner) {
        const text = `INSERT INTO
          cars(id, ownerid, createdon, state, status, type, manufacturer, model, price, photo)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;

        const values = [
            uuid.v4(),
            owner.id,
            moment().format('llll'),
            data.state,
            "available",
            data.type,
            data.manufacturer,
            data.model,
            data.price,
            data.photo
        ];

        try {
            const result = await db.query(text, values);
            return result.rows[0];
        } catch (err) {
            console.log(err);
            return error;
        }
    }

    /**
     *
     * @param {uuid} id
     * @returns {object} car object
     */
    async viewSpecificCar(id) {
        const text = `SELECT * FROM cars WHERE id = $1`;
        const values = [id];
        try {
            const result = await db.query(text, values);
            if (result) {
                return result.rows[0];
            }
            return;
        } catch (err) {
            return err;
        }
    }

    /**
     *
     * @returns {object} all cars
     */
    async viewAllCars() {
        const text = `SELECT * FROM cars`;
        try {
            const result = await db.query(text);
            if (result) {
                return result.rows;
            }
            return;
        } catch (err) {
            return err;
        }
    }

    /**
     *
     * @param {status} car object status
     * @returns {object} all unsold cars
     */
    async viewUnsoldCars(status) {
        const text = `SELECT * FROM cars WHERE status = $1`;
        const values = [status];
        try {
            const result = await db.query(text, values);
            if (result) {
                return result.rows;
            }
            return;
        } catch (err) {
            return err;
        }
    }

    /**
     *
     * @param {object} object
     * @returns {object} unsold cars within a price range
     */
    async viewCarsWithinRange(query) {
        const text = `SELECT * FROM
         cars WHERE status = $1 AND price BETWEEN $2 AND $3`;
        const values = [
            "available",
            query.min_price,
            query.max_price
        ];
        try {
            const result = await db.query(text, values);
            if (result) {
                return result.rows;
            }
            return;
        } catch (err) {
            return err;
        }
    }

    /**
     *
     * @param {object} object
     * @returns {object} unsold cars with specific state
     */
    async viewCarsWithState(query) {
        const text = `SELECT * FROM
         cars WHERE status = $1 AND state = $2`;
        const values = [
            "available",
            query.state
        ];
        try {
            const result = await db.query(text, values);
            if (result) {
                return result.rows;
            }
            return;
        } catch (err) {
            return err;
        }
    }

    /**
     *
     * @param {object} object
     * @returns {object} unsold cars with specific manufacturer
     */
    async viewCarsWithManufacturer(query) {
        const text = `SELECT * FROM
         cars WHERE status = $1 AND manufacturer = $2`;
        const values = [
            query.status,
            query.manufacturer
        ];
        try {
            const result = await db.query(text, values);
            if (result) {
                return result.rows;
            }
            return;
        } catch (err) {
            return err;
        }
    }

    /**
     *
     * @param {object} object
     * @returns {object} unsold cars with specific type
     */
    async viewCarsWithType(query) {
        const text = `SELECT * FROM
         cars WHERE status = $1 AND type LIKE $2`;
        const values = [
            query.status,
            query.type
        ];
        try {
            const result = await db.query(text, values);
            if (result) {
                return result.rows;
            }
            return;
        } catch (err) {
            return err;
        }
    }

    /**
     *
     * @params {uuid} id
     * @returns {object} update car status
     */
    async updateStatus(id, data) {
        const text = `UPDATE cars SET status=$1
            WHERE id=$2 RETURNING *`;
        const values = [
            data.status,
            id
        ];

        try {
            const result = await db.query(text, values);
            return result.rows[0];
        } catch (err) {
            console.log(err);
            return error;
        }
    }

    /**
     *
     * @params {uuid} id
     * @returns {object} update car price
     */
    async updatePrice(id, data) {
        const text = `UPDATE cars SET price=$1
            WHERE id=$2 RETURNING *`;
        const values = [
            data.price,
            id
        ];

        try {
            const result = await db.query(text, values);
            return result.rows[0];
        } catch (err) {
            console.log(err);
            return error;
        }
    }

    async deleteCar(id) {
        const text = `DELETE FROM cars
            WHERE id = $1 RETURNING *`;
        const values = [
            id
        ];

        try {
            const result = await db.query(text, values);
            return result.rows[0];
        } catch (err) {
            console.log(err);
            return error;
        }
    }

    /**
     *
     * clears the cars list
     */
    clearCars() {
        this.cars = [];
    }
}


export default new Car();