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
            (data.proposed_price === undefined && data.proposed_price !== 0)) {
            this.status = 400;
            return {
                "status": this.status,
                "error": "Car_id and proposed_price are required"
            }
        }
        if (Validator.isValidPrice(data.proposed_price) !== "valid") {
            this.status = 417;
            return {
                "status": this.status,
                "error": Validator.isValidPrice(data.proposed_price)
            }

        }
        const order = new Order()
            // const order = o.createOrder(data);
        return order.createOrder(data)
    }


}

export default OrderController;