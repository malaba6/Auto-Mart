import moment from "moment";
import uuid from "uuid";
import Validator from "../validation/validation";
import cloudinary from "cloudinary";
import { timingSafeEqual } from "crypto";





class Car {
    /**
     * 
     * class constructor
     * */
    constructor() {
            // this.cars = [{
            //         id: uuid.v4(),
            //         createdOn: moment().format('llll'),
            //         state: "new",
            //         status: "available",
            //         price: 10000,
            //         manufacturer: "Toyota",
            //         model: "Corolla S 2015",
            //         type: "Car"
            //     },
            //     {
            //         id: uuid.v4(),
            //         createdOn: moment().format('llll'),
            //         state:: "available",
            //         price: 20000,
            //         manufa "used",
            //         statuscturer: "WolksWagon",
            //         model: "2016 Amarok",
            //         type: "Pickup Truck"
            //     }
            // ];
            this.cars = [];
            // this.newCar;
        }
        /**
         * 
         * @param {object} data
         * @returns {object} car object
         */
    postCar(data) {
        const newCar = {
            id: uuid.v4(),
            createdOn: moment().format('llll'),
            state: data.state,
            status: "available",
            price: data.price,
            manufacturer: data.manufacturer,
            model: data.model,
            type: data.type,
            photo: data.photo
        };
        this.cars.push(newCar);
        return newCar;
    }


    /**
     * 
     * @param {uuid} id
     * @returns {object} car object
     */
    viewSpecificCar(id) {
        return this.cars.find(car => car.id === id);
    }

    /**
     * 
     * @returns {object} returns all cars
     */
    viewAllCars() {
        return this.cars;
    }

}

export default new Car();