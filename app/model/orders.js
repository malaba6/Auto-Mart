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
    isExistingOrder(id) {
        return this.orders.find(order => order.id === id);
    }

    /**
     *
     * @params {uuid} id
     * @returns {object} order object
     */
    updatePrice(id, data) {
        const order = this.isExistingOrder(id);
        const oldPrice = order.offered_price;
        order.offered_price = data.offered_price;
        return {
            id: order.id,
            createdOn: order.createdOn,
            car_id: order.car_id,
            status: order.status,
            price: order.price,
            old_price_offered: oldPrice,
            offered_price: order.offered_price,
        };
    }
}

export default new Order();