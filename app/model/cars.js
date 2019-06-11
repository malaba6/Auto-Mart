import moment from 'moment';
import uuid from 'uuid';


class Car {
  /**
     *
     * class constructor
     * */
  constructor() {
    this.cars = [{
      id: 'b8aa4d11-baa4-4d6a',
      createdOn: moment().format('llll'),
      state: 'new',
      status: 'sold',
      price: 63000,
      manufacturer: 'Jeep',
      model: ' Wrangler JL Sport',
      type: 'Car',
      photo: 'https://res.cloudinary.com/eubule/image/upload/v1559245298/ford.jpg',
    },
    {
      id: 'b8aa4d11-baa4-4d6b',
      createdOn: moment().format('llll'),
      state: 'used',
      status: 'available',
      price: 20000,
      manufacturer: 'VolksWagon',
      model: '2016 Amarok',
      type: 'Pickup Truck',
      photo: 'https://res.cloudinary.com/eubule/image/upload/v1559245298/ford.jpg',
    },
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
      status: 'available',
      price: data.price,
      manufacturer: data.manufacturer,
      model: data.model,
      type: data.type,
      photo: data.photo,
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
     * @param {object} object
     * @returns {object} unsold cars within a price range
     */
  viewCarsWithinRange(query) {
    return this.cars.filter(car => car.status === query.status
            && car.price >= query.min_price
            && car.price <= query.max_price);
  }

  /**
     *
     * @param {object} object
     * @returns {object} unsold cars with specific state
     */
  viewCarsWithState(query) {
    return this.cars.filter(car => car.status === query.status
            && car.state === query.state);
  }

  /**
     *
     * @param {object} object
     * @returns {object} unsold cars with specific manufacturer
     */
  viewCarsWithManufacturer(query) {
    return this.cars.filter(car => car.status === query.status
            && car.manufacturer.toLowerCase() === query.manufacturer.toLowerCase());
  }

  /**
     *
     * @param {object} object
     * @returns {object} unsold cars with specific type
     */
  viewCarsWithType(query) {
    return this.cars.filter(car => car.status === query.status
            && car.type.toLowerCase().includes(query.type.toLowerCase()));
  }

  /**
     *
     * @params {uuid} id
     * @returns {object} update car status
     */
  updateStatus(id, data) {
    const car = this.viewSpecificCar(id);
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
    };
  }

  /**
     *
     * @params {uuid} id
     * @returns {object} update car price
     */
  updatePrice(id, data) {
    const car = this.viewSpecificCar(id);
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
      photo: data.photo,
    };
  }

  /**
     *
     * clears the cars list
     */
  clearCars() {
    this.cars = [];
  }
}


export default new Car();
