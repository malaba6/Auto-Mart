import moment from "moment";
import uuid from "uuid";
import { brotliDecompressSync } from "zlib";


class Car {
    /**
     * 
     * class constructor
     * */
    constructor() {
        this.cars = [{
                id: "b8aa4d11-baa4-4d6a",
                createdOn: moment().format('llll'),
                state: "new",
                status: "available",
                price: 63000,
                manufacturer: "Jeep",
                model: " Wrangler JL Sport",
                type: "Car",
                photo: "https://malaba6.github.io/Auto-Mart/img/jeep.jpg"
            },
            {
                id: "b8aa4d11-baa4-4d6b",
                createdOn: moment().format('llll'),
                state: "used",
                status: "available",
                price: 20000,
                manufacturer: "VolksWagon",
                model: "2016 Amarok",
                type: "Pickup Truck",
                photo: "https://malaba6.github.io/Auto-Mart/img/volkswagen.jpg"
            }
        ];
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
     * @returns {object} all cars
     */
    viewAllCars() {
        return this.cars;
    }

    /**
     * 
     * @param {status} car object status
     * @returns {object} all unsold cars
     */
    viewUnsoldCars(status) {
        return this.cars.filter(car => car.status == status);
    }

    /**
     * 
     * @param {object} data object
     * @returns {object} unsold cars within a price range
     */
    viewUnsoldWithinPriceRange(data) {
        return data;
    }

    /**
     * 
     * @params {uuid} id
     * @returns {object} update car status
     */
    updateStatus(id, data) {
        let car = this.viewSpecificCar(id);
        car.status = data.status;
        return {
            id: car.id,
            createdOn: car.createdOn,
            state: car.state,
            status: car.status,
            price: car.price,
            manufacturer: car.manufacturer,
            model: car.model,
            type: car.type,
            photo: data.photo
        }
    }

    /**
     * 
     * @params {uuid} id
     * @returns {object} update car price
     */
    updatePrice(id, data) {
        let car = this.viewSpecificCar(id);
        car.price = data.price;
        return {
            id: car.id,
            createdOn: car.createdOn,
            state: car.state,
            status: car.status,
            price: car.price,
            manufacturer: car.manufacturer,
            model: car.model,
            type: car.type,
            photo: data.photo
        }
    }

}


export default new Car();