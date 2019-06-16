import Car from '../model/cars';
import Validator from '../validation/validation';


const CarController = {
    status: 200,

    /**
     *
     * @params {object} data
     * @returns {object} car promise
     */
    async postCar(data, owner) {
        if (Validator.isValidPrice(data.price) !== 'valid') {
            this.status = 422;
            return {
                error: Validator.isValidPrice(data.price),
                status: this.status,
            };
        }
        if (Validator.isValidState(data.state) !== 'valid') {
            this.status = 422;
            return {
                error: Validator.isValidState(data.state),
                status: this.status,
            };
        }
        if (Validator.isValidManufacturer(data.manufacturer) !== 'valid') {
            this.status = 422;
            return {
                error: Validator.isValidManufacturer(data.manufacturer),
                status: this.status,
            };
        }
        if (Validator.isValidModel(data.model) !== 'valid') {
            this.status = 422;
            return {
                error: Validator.isValidModel(data.model),
                status: this.status,
            };
        }
        if (Validator.isValidType(data.type) !== 'valid') {
            this.status = 422;
            return {
                error: Validator.isValidType(data.type),
                status: this.status,
            };
        }

        if (Validator.isImageFound(data.photo) !== 'found') {
            this.status = 422;
            return {
                error: Validator.isImageFound(data.photo),
                status: this.status
            };
        }

        const car = await Car.postCar(data, owner);
        this.status = 201;
        return {
            status: this.status,
            data: car
        };
    },

    /**
     *
     * @param {status} unsold cars
     * @returns {object} cars array
     */
    async viewCars(query, usr) {
        const { length } = Object.entries(query);

        // If no query parameters, fetch all cars
        if (length === 0) {
            const cars = Car.viewAllCars();
            this.status = 200;

            if (cars.length === 0) {
                return {
                    status: this.status,
                    message: 'Oops! It is lonely here!',
                };
            }
            return {
                status: this.status,
                data: cars,
            };
        }

        // Check if status is the query parameter
        if (query.status && length === 1) {
            if (query.status !== 'available' && query.status === 'sold') {
                this.status = 403;
                return {
                    status: this.status,
                    error: 'You have no authorization to view this',
                };
            }

            const cars = await Car.viewUnsoldCars(query.status);
            this.status = 200;
            if (cars.length === 0) {
                this.status = 404;
                return {
                    status: this.status,
                    message: 'Oh oh! No cars Posted here yet!',
                };
            }
            return {
                status: this.status,
                data: cars,
            };
        }

        // Check if status min_price and max_price are icluded in the query params
        if (query.status === 'available' &&
            (query.min_price || query.min_price === 0) &&
            (query.max_price || query.max_price === 0) && length === 3) {
            if (Validator.isValidMaxMInPrice(query.min_price) !== 'valid') {
                this.status = 422;
                return {
                    status: this.status,
                    error: Validator.isValidMaxMInPrice(query.min_price),
                };
            }

            if (Validator.isValidMaxMInPrice(query.max_price) !== 'valid') {
                this.status = 422;
                return {
                    status: this.status,
                    error: Validator.isValidMaxMInPrice(query.max_price),
                };
            }
            const min_price = +query.min_price;
            const max_price = +query.max_price;

            if (min_price > max_price) {
                this.status = 422;
                return {
                    status: this.status,
                    error: 'Min price must be less than Max price',
                };
            }

            const cars = await Car.viewCarsWithinRange(query);
            this.status = 200;

            if (cars.length === 0) {
                this.status = 404;
                return {
                    status: this.status,
                    message: 'Oh oh! No cars within that range',
                };
            }
            return {
                status: this.status,
                data: cars
            };
        }

        // Check if status and state (new/used) are included in the query
        if (query.status === 'available' && query.state && length === 2) {

            if (Validator.isValidState(query.state) !== 'valid') {
                this.status = 422;
                return {
                    status: this.status,
                    error: Validator.isValidState(query.state),
                };
            }

            const cars = await Car.viewCarsWithState(query);

            this.status = 200;
            if (cars.length === 0) {
                this.status = 404;
                return {
                    status: this.status,
                    message: `Oh oh! No ${query.state} cars here yet`,
                };
            }
            return {
                status: this.status,
                data: cars
            };
        }

        // Check if status and manufacturer are included in the query
        if (query.status === 'available' && query.manufacturer && length === 2) {
            const cars = Car.viewCarsWithManufacturer(query);
            this.status = 200;

            if (cars.length === 0) {
                this.status = 404;
                return {
                    status: this.status,
                    message: `Oh oh! No ${query.manufacturer} cars here yet`,
                };
            }
            return {
                status: this.status,
                data: cars,
            };
        }

        // Check if status and type are included the query param
        if (query.status && query.type && length === 2) {
            const cars = Car.viewCarsWithType(query);
            this.status = 200;

            if (cars.length === 0) {
                this.status = 404;
                return {
                    status: this.status,
                    message: `Oh oh! No ${query.type} cars here yet`,
                };
            }
            return {
                status: this.status,
                data: cars,
            };
        }

        this.status = 400;
        return {
            status: this.status,
            error: 'Invalid query. We could not find what you are looking for',
        };
    },

    /**
     *
     * @param {uuid} id
     * @returns {oblect} update car status
     */
    async updateStatus(id, data, user) {
        if (data.status === undefined && data.status !== 0) {
            this.status = 400;
            return {
                status: this.status,
                error: 'status is required in the request',
            };
        }
        if (Validator.isValidStatus(data.status) !== 'valid') {
            this.status = 422;
            return {
                status: this.status,
                error: Validator.isValidStatus(data.status),
            };
        }

        const car = await Car.viewSpecificCar(id);

        if (!car) {
            this.status = 404;
            return {
                status: this.status,
                error: `Car with id ${id} not found`
            };
        }
        if (user.id !== car.ownerid) {
            this.status = 403;
            return {
                status: this.status,
                message: 'You cannot update a car Ad you do not own'
            };
        }

        const updated = await Car.updateStatus(id, data);

        this.status = 200;
        return {
            status: this.status,
            data: updated
        };
    },

    /**
     *
     * @param {uuid} id
     * @returns {oblect} update car price
     */
    async updatePrice(id, data, user) {
        if (data.price === undefined && data.price !== 0) {
            this.status = 400;
            return {
                status: this.status,
                error: 'price is required in the request',
            };
        }
        if (Validator.isValidPrice(data.price) !== 'valid') {
            this.status = 422;
            return {
                status: this.status,
                error: Validator.isValidPrice(data.price),
            };
        }
        const car = await Car.viewSpecificCar(id);

        if (!car) {
            this.status = 404;
            return {
                status: this.status,
                error: `Car with id ${id} not found`
            };
        }
        if (user.id !== car.ownerid) {
            this.status = 403;
            return {
                status: this.status,
                message: 'You cannot update a car Ad you do not own'
            };
        }

        const updated = await Car.updatePrice(id, data);

        this.status = 200;
        return {
            status: this.status,
            data: updated
        };
    },

    /**
     *
     * @param {uuid} id
     * @returns {object} car object
     */
    async viewSpecificCar(id) {
        const car = await Car.viewSpecificCar(id);
        if (!car) {
            this.status = 404;
            return {
                status: this.status,
                error: `Car with id ${id} not found`,
            };
        }

        this.status = 200;
        return {
            status: this.status,
            data: car,
        };
    },

    /**
     *
     * @param {uuid} id
     * @returns {object} delete message
     */
    deleteCar(id) {
        const car = Car.viewSpecificCar(id);

        if (!car) {
            this.status = 404;
            return {
                status: this.status,
                error: `Car with id ${id} not found`,
            };
        }

        const index = Car.cars.indexOf(car);
        Car.cars.splice(index, 1);

        this.status = 200;
        return {
            status: this.status,
            message: 'Car Ad successfully deleted',
        };
    },
};

export default CarController;