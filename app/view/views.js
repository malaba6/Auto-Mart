import express from "express";
// import CarController from "../controller/carController";
import userController from "../controller/userController";

const route = express.Router();
// let status = CarController.status;

route.get('/', (req, res) => {
    return res.status(200).send(({ "message": "Welcome to Auto-Mart" }));
});

// route.post('/api/v1/cars', (req, res) => {
//     const car = CarController.postCar(req.body);
//     return res.status(CarController.status).send(car);
// });

// route.get('/api/v1/cars', (req, res) => {
//     return res.status(200).send(CarController.viewAllCars());
// });

route.post('/api/v1/auth/signup', (req, res) => {
    const user = userController.signup(req.body);
    return res.status(userController.status).send(user);
});

export default route;