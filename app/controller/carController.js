import Car from "../model/cars";
import Validator from "../validation/validation";


const CarController = {
    status: 200,

    /**
     * 
     * @params {object} data
     * @returns {object} car object
     */
    postCar(data) {
        if (Validator.isValidPrice(data.price) !== "valid") {
            this.status = 417;
            return {
                "error": Validator.isValidPrice(data.price),
                "status": this.status
            }

        }
        if (Validator.isValidState(data.state) !== "valid") {
            this.status = 417;
            return {
                "error": Validator.isValidState(data.state),
                "status": this.status
            }

        }
        if (Validator.isValidManufacturer(data.manufacturer) !== "valid") {
            this.status = 417;
            return {
                "error": Validator.isValidManufacturer(data.manufacturer),
                "status": this.status
            }

        }
        if (Validator.isValidModel(data.model) !== "valid") {
            this.status = 417;
            return {
                "error": Validator.isValidModel(data.model),
                "status": this.status
            }

        }
        if (Validator.isValidType(data.type) !== "valid") {
            this.status = 417;
            return {
                "error": Validator.isValidType(data.type),
                "status": this.status
            }

        }
        console.log(data.photo);
        if (Validator.isValidImageUrl(data.photo) !== "valid") {
            this.status = 417;
            return {
                "status": 417,
                "error": Validator.isValidImageUrl(data.photo)
            }
        }

        const car = Car.postCar(data);
        this.status = 201;
        return {
            "status": this.status,
            "data": car
        }
    },

    /**
     * 
     * @param {status} unsold cars
     * @returns {object} cars array
     */
    viewCars(query) {
        const length = Object.entries(query).length;

        // If no query parameters, fetch all cars
        if (length === 0) {
            const cars = Car.viewAllCars();
            this.status = 200

            if (!cars) {
                return {
                    "status": this.status,
                    "message": "Oops! It is lonely here!"
                }
            }
            return {
                "status": this.status,
                "data": cars
            }
        }

        // Check if status is the query parameter
        if (query.status && length == 1) {
            if (query.status !== "available" && query.status === "sold") {
                this.status = 403;
                return {
                    "status": this.status,
                    "error": `You have no authorization to view this`
                }
            }

            const cars = Car.viewUnsoldCars(query.status);
            this.status = 200;
            if (cars.length === 0) {
                return {
                    "status": this.status,
                    "message": "Oh oh! No cars Posted here yet!"
                }
            }
            return {
                "status": this.status,
                "data": cars
            }
        }

        // Check if status min_price and max_price are icluded in the query params
        if (query.status && (query.min_price || query.min_price === 0) &&
            (query.max_price || query.max_price === 0) && length == 3) {

            if (query.status !== "available") {
                this.status = 404;
                return {
                    "status": this.status,
                    "error": `Invalid query for status`
                }
            }
            if (query.min_price > query.max_price) {
                this.status = 417;
                return {
                    "status": this.status,
                    "error": "Min price must be less than Max price"
                }
            }
            if (Validator.isValidMaxMInPrice(query.min_price) !== "valid") {
                this.status = 417;
                return {
                    "status": this.status,
                    "error": Validator.isValidMaxMInPrice(query.min_price)
                }
            }

            if (Validator.isValidMaxMInPrice(query.max_price) !== "valid") {
                this.status = 417;
                return {
                    "status": this.status,
                    "error": Validator.isValidMaxMInPrice(query.max_price)
                }
            }

            const cars = Car.viewCarsWithinRange(query);
            this.status = 200;
            if (cars.length === 0) {
                return {
                    "status": this.status,
                    "message": "Oh oh! No cars within that range"
                }
            }
            return {
                "status": this.status,
                "data": cars
            }

        }

        // Check if status and state (new/used) are included in the query
        if (query.status && query.state && length == 2) {
            if (Validator.isValidStatusQuery(query.status) !== "valid") {
                this.status = 404;
                return {
                    "status": this.status,
                    "error": Validator.isValidStatusQuery(query.status)
                }
            }

            if (Validator.isValidState(query.state) !== "valid") {
                this.status = 417;
                return {
                    "status": this.status,
                    "error": Validator.isValidState(query.state)
                }
            }

            const cars = Car.viewCarsWithState(query);
            this.status = 200;
            if (cars.length === 0) {
                return {
                    "status": this.status,
                    "message": `Oh oh! No ${query.state} cars here yet`
                }
            }
            return {
                "status": this.status,
                "data": cars
            }
        }

        if (data.status && data.manufacturer && length == 2) {
            console.log("Status and manufaturer");
        }
        if (data.status && data.body_type && length == 2) {
            console.log("Status and body_type");
        }
        console.log("Invalid query. ")

    },

    /**
     * 
     * @param {object} data object
     * @returns {object} unsold cars within a price range
     */
    viewUnsoldWithinPriceRange(data) {
        return {
            "data": data
        }
    },


    /**
     * 
     * @param {uuid} id
     * @returns {oblect} update car status
     */
    updateStatus(id, data) {
        if (data.status === undefined && data.status !== 0) {
            this.status = 400;
            return {
                "status": this.status,
                "error": "status is required in the request"
            }
        }
        if (Validator.isValidStatus(data.status) !== "valid") {
            this.status = 417;
            return {
                "status": this.status,
                "error": Validator.isValidStatus(data.status)
            }

        }
        if (!Car.viewSpecificCar(id)) {
            this.status = 404;
            return {
                "status": this.status,
                "error": `Car with id ${id} not found`
            }
        }

        this.status = 200;
        return {
            "status": this.status,
            "data": Car.updateStatus(id, data)
        }
    },

    /**
     * 
     * @param {uuid} id
     * @returns {oblect} update car price
     */
    updatePrice(id, data) {
        if (data.price === undefined && data.price !== 0) {
            this.status = 400;
            return {
                "status": this.status,
                "error": "price is required in the request"
            }
        }
        if (Validator.isValidPrice(data.price) !== "valid") {
            this.status = 417;
            return {
                "status": this.status,
                "error": Validator.isValidPrice(data.price)
            }

        }
        if (!Car.viewSpecificCar(id)) {
            this.status = 404;
            return {
                "status": this.status,
                "error": `Car with id ${id} not found`
            }
        }

        this.status = 200;
        return {
            "status": this.status,
            "data": Car.updatePrice(id, data)
        }
    },

    /**
     * 
     * @param {uuid} id
     * @returns {object} car object
     */
    viewSpecificCar(id) {
        const car = Car.viewSpecificCar(id);
        if (!car) {
            this.status = 404;
            return {
                "status": this.status,
                "error": `Car with id ${id} not found`
            }
        }

        this.status = 200;
        return {
            "status": this.status,
            "data": car
        }
    },

    /**
     * 
     * @param {uuid} id
     * @returns {object} delete message
     */
    deleteCar(id) {
        const car = Car.viewSpecificCar(id);
        const index = Car.cars.indexOf(car);
        Car.cars.splice(index, 1)

        this.status = 200;
        return {
            "status": this.status,
            "data": "Car Ad successfully deleted"
        }
    }
}

export default CarController;