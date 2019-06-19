import uuid from 'uuid';
import moment from 'moment';
import Car from './cars';
import db from "../database/db";


class Order {
    /**
     *
     * @param {object} data
     * @returns {object} order object
     */
    async createOrder(data, owner) {

        const text = `INSERT INTO
          orders(id, ownerid, createdon, carid, status, price, offeredprice)
          VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

        const car = await Car.viewSpecificCar(data.car_id);
        const values = [
            uuid.v4(),
            owner.id,
            moment().format('llll'),
            data.car_id,
            car.status,
            car.price,
            data.offered_price
        ];

        try {
            const result = await db.query(text, values);
            return result.rows[0];
        } catch (err) {
            return error;
        }
    }

    /**
     *
     * @param {uuid} id
     * @returns {object} order object
     */
    async isExistingOrder(id) {
        const text = `SELECT * FROM orders WHERE id=$1`;
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
     * @params {uuid} id
     * @returns {object} order object
     */
    async updatePrice(id, data) {
        const text = `UPDATE orders SET offeredprice=$1
            WHERE id=$2 RETURNING *`;
        const values = [
            data.offered_price,
            id
        ];

        try {
            const result = await db.query(text, values);
            return result.rows[0];
        } catch (err) {
            return error;
        }
    }
}

export default new Order();