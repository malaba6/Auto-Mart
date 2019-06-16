import Order from '../model/orders';
import Validator from '../validation/validation';
import Car from "../model/cars";


const OrderController = {
    status: 200,

    /**
     *
     * @params {object} data
     * @returns {object} Order object
     */
    async createOrder(data, user) {
        if ((data.car_id === undefined && data.car_id !== 0) ||
            (data.offered_price === undefined && data.offered_price !== 0)) {
            this.status = 400;
            return {
                status: this.status,
                error: 'Car_id and offered_price are required',
            };
        }
        if (Validator.isValidPrice(data.offered_price) !== 'valid') {
            this.status = 422;
            return {
                status: this.status,
                error: Validator.isValidPrice(data.offered_price),
            };
        }

        const car = await Car.viewSpecificCar(data.car_id);

        if (!car) {
            this.status = 404;
            return {
                status: this.status,
                error: `Car with id ${data.car_id} not found`,
            };
        }
        if (car.ownerid === user.id) {
            this.status = 403;
            return {
                status: this.status,
                error: `You cannot order a car you own`
            };
        }

        const order = await Order.createOrder(data, user);

        this.status = 201;
        return {
            status: this.status,
            data: order
        };
    },

    /**
     *
     * @param {uuid} id
     * @returns {object} update order price
     */
    async updatePrice(id, data, user) {
        if (data.offered_price === undefined && data.offered_price !== 0) {
            this.status = 400;
            return {
                status: this.status,
                error: 'offered_price is required in the request',
            };
        }
        if (Validator.isValidPrice(data.offered_price) !== 'valid') {
            this.status = 422;
            return {
                status: this.status,
                error: Validator.isValidPrice(data.offered_price),
            };
        }

        const order = await Order.isExistingOrder(id);
        if (!order) {
            this.status = 404;
            return {
                status: this.status,
                error: `Order with id ${id} not found`,
            };
        }
        if (order.status === 'sold') {
            this.status = 404;
            return {
                status: this.status,
                message: 'This car Ad is no longer available'
            };
        }

        if (user.id !== order.ownerid) {
            this.status = 403;
            return {
                status: this.status,
                message: 'You cannot update a purchase order you do not own'
            };
        }

        this.status = 200;

        const update = await Order.updatePrice(id, data);
        return {
            status: this.status,
            data: update
        };
    },

};

export default OrderController;