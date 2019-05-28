import uuid from "uuid";
import moment from "moment";
import Car from "./cars";


class Order {
    /**
     * 
     * class constructor
     */
    constructor() {
        this.order = [{
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
        this.order.push(newOrder);
        return newOrder;
    }
}

export default Order;