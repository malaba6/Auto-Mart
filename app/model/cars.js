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
          cars(id, ownerid, createdon, state, status, manufacturer, model, price, photo)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

        const values = [
            uuid.v4(),
            owner.id,
            moment().format('llll'),
            data.state,
            "available",
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
    viewAllCars() {
        return this.cars;
    }

    /**
     *
     * @param {status} car object status
     * @returns {object} all unsold cars
     */
    viewUnsoldCars(status) {
        return this.cars.filter(car => car.status == status);
    }

    /**
     *
     * @param {object} object
     * @returns {object} unsold cars within a price range
     */
    viewCarsWithinRange(query) {
        return this.cars.filter(car => car.status === query.status &&
            car.price >= query.min_price &&
            car.price <= query.max_price);
    }

    /**
     *
     * @param {object} object
     * @returns {object} unsold cars with specific state
     */
    viewCarsWithState(query) {
        return this.cars.filter(car => car.status === query.status &&
            car.state === query.state);
    }

    /**
     *
     * @param {object} object
     * @returns {object} unsold cars with specific manufacturer
     */
    viewCarsWithManufacturer(query) {
        return this.cars.filter(car => car.status === query.status &&
            car.manufacturer.toLowerCase() === query.manufacturer.toLowerCase());
    }

    /**
     *
     * @param {object} object
     * @returns {object} unsold cars with specific type
     */
    viewCarsWithType(query) {
        return this.cars.filter(car => car.status === query.status &&
            car.type.toLowerCase().includes(query.type.toLowerCase()));
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

    /**
     *
     * clears the cars list
     */
    clearCars() {
        this.cars = [];
    }
}


export default new Car();