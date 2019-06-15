import moment from 'moment';
import uuid from 'uuid';
import db from "../database/db";

class Car {
    /**
     *
     * @param {object} data
     * @returns {object} car object
     */
    async postCar(data) {
        const text = `INSERT INTO
          cars(id, createdon, state, status, manufacturer, model, price, photo)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

        const values = [
            uuid.v4(),
            moment().format('llll'),
            data.state,
            "new",
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
    viewSpecificCar(id) {
        return this.cars.find(car => car.id === id);
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
    updateStatus(id, data) {
        const car = this.viewSpecificCar(id);
        car.status = data.status;
        return {
            id: car.id,
            createdOn: car.createdOn,
            state: car.state,
            status: car.status,
            price: car.price,
            manufacturer: car.manufacturer,
            model: car.model,
            type: car.type,
        };
    }

    /**
     *
     * @params {uuid} id
     * @returns {object} update car price
     */
    updatePrice(id, data) {
        const car = this.viewSpecificCar(id);
        car.price = data.price;
        return {
            id: car.id,
            createdOn: car.createdOn,
            state: car.state,
            status: car.status,
            price: car.price,
            manufacturer: car.manufacturer,
            model: car.model,
            type: car.type,
            photo: data.photo,
        };
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