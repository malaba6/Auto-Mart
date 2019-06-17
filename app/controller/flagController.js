import Flag from '../model/flag';
import Validator from '../validation/validation';
import Car from '../model/cars';


const FlagController = {
    status: 200,

    /**
     *
     * @params {object} data
     * @returns {object} Flag object
     */
    async createFlag(data, user) {
        if ((data.car_id === undefined && data.car_id !== 0) ||
            (data.reason === undefined && data.reason !== '') ||
            (data.description === undefined && data.description !== '')) {
            this.status = 400;
            return {
                status: this.status,
                error: 'Car_id, reason and description are required',
            };
        }
        if (Validator.isValidReason(data.reason) !== 'valid') {
            this.status = 422;
            return {
                status: this.status,
                error: Validator.isValidReason(data.reason),
            };
        }
        if (Validator.isValidDescription(data.description) !== 'valid') {
            this.status = 422;
            return {
                status: this.status,
                error: Validator.isValidDescription(data.description),
            };
        }
        if (Validator.isValidId(data.car_id) !== 'valid') {
            this.status = 422;
            return {
                status: this.status,
                error: Validator.isValidId(data.car_id),
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

        const flag = await Flag.createFlag(data, user);

        this.status = 201;
        return {
            status: this.status,
            data: flag
        };
    },

};

export default FlagController;