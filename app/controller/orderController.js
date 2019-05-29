import Order from "../model/orders";
import Validator from "../validation/validation";


const OrderController = {
    status: 200,

    /**
     * 
     * @params {object} data
     * @returns {object} Order object
     */
    createOrder(data) {
        if ((data.car_id === undefined && data.car_id !== 0) ||
            (data.offered_price === undefined && data.offered_price !== 0)) {
            this.status = 400;
            return {
                "status": this.status,
                "error": "Car_id and offered_price are required"
            }
        }
        if (Validator.isValidPrice(data.offered_price) !== "valid") {
            this.status = 417;
            return {
                "status": this.status,
                "error": Validator.isValidPrice(data.offered_price)
            }

        }
        if (!Order.isExistingCar(data.car_id)) {
            this.status = 404;
            return {
                "status": this.status,
                "error": `id ${data.car_id} not found`
            };
        }

        this.status = 201;
        return {
            "status": this.status,
            "data": Order.createOrder(data)
        }
    },

    /**
     * 
     * @param {uuid} id
     * @returns {object} update order price
     */
    updatePrice(id, data) {
        if (data.offered_price === undefined && data.offered_price !== 0) {
            this.status = 400;
            return {
                "status": this.status,
                "error": "offered_price is required in the request"
            }
        }
        if (Validator.isValidPrice(data.offered_price) !== "valid") {
            this.status = 417;
            return {
                "status": this.status,
                "error": Validator.isValidPrice(data.offered_price)
            }

        }
        if (!Order.isExistingOrder(id)) {
            this.status = 404;
            return {
                "status": this.status,
                "error": `id ${id} not found`
            }
        }
        if (Order.isExistingOrder(id).status === "sold") {
            this.status = 301;
            return {
                "status": this.status,
                "message": `This car Ad is no longer available`
            }
        }

        this.status = 200;
        return {
            "status": this.status,
            "data": Order.updatePrice(id, data)
        }
    }

}

export default OrderController;