import Flag from "../model/flag";
import Validator from "../validation/validation";
import Car from "../model/cars";


const FlagController = {
    status: 200,

    /**
     * 
     * @params {object} data
     * @returns {object} Flag object
     */
    createFlag(data) {
        if ((data.car_id === undefined && data.car_id !== 0) ||
            (data.reason === undefined && data.reason !== "") ||
            (data.description === undefined && data.description !== "")) {
            this.status = 400;
            return {
                "status": this.status,
                "error": "Car_id, reason and description are required"
            }
        }
        if (Validator.isValidReason(data.reason) !== "valid") {
            this.status = 417;
            return {
                "status": this.status,
                "error": Validator.isValidReason(data.reason)
            }

        }
        if (Validator.isValidDescription(data.description) !== "valid") {
            this.status = 417;
            return {
                "status": this.status,
                "error": Validator.isValidDescription(data.description)
            }

        }
        if (Validator.isValidId(data.car_id) !== "valid") {
            this.status = 417;
            return {
                "status": this.status,
                "error": Validator.isValidId(data.car_id)
            }
        }
        if (!Car.viewSpecificCar(data.car_id)) {
            this.status = 404;
            return {
                "status": this.status,
                "error": `Car with id ${data.car_id} not found`
            }
        }

        this.status = 201;
        return {
            "status": this.status,
            "data": Flag.createFlag(data)
        }
    }

}

export default FlagController;