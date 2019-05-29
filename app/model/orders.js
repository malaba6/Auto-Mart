import uuid from "uuid";
import moment from "moment";
import Car from "./cars";


class Order {
    /**
     * 
     * class constructor
     */
    constructor() {
        this.orders = [{
            id: uuid.v4(),
            createdOn: moment().format('llll'),
            car_id: "b8aa4d11-baa4-4d6a",
            status: "available",
            price: 63000,
            offered_price: 60000
        }]
    }

    /**
     * 
     * @param {object} data
     * @returns {object} order object
     */
    createOrder(data) {
        const car = Car.viewSpecificCar(data.car_id);
        const newOrder = {
            id: uuid.v4(),
            createdOn: moment().format('llll'),
            car_id: data.car_id,
            status: car.status,
            price: car.price,
            offered_price: data.offered_price
        }
        this.orders.push(newOrder);
        return newOrder;
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
     * @param {uuid} id 
     * @param {object} car object
     */
    isExistingCar(id) {
        return Car.viewSpecificCar(id);
    }

    /**
     * 
     * @params {uuid} id
     * @returns {object} order object
     */
    updatePrice(id, data) {
        let order = this.isExistingOrder(id);
        const oldPrice = order.offered_price;
        order.offered_price = data.offered_price;
        return {
            id: order.id,
            createdOn: order.createdOn,
            car_id: order.car_id,
            status: order.status,
            price: order.price,
            old_price_offered: oldPrice,
            offered_price: order.offered_price
        }
    }


}

export default new Order();