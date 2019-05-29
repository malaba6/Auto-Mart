import express from "express";
import CarController from "../controller/carController";
import OrderController from "../controller/orderController";
import userController from "../controller/userController";
import { imageUploader } from "../middleware/middlewares";

const route = express.Router();

route.get('/', (req, res) => {
    return res.status(200).send(({ "message": "Welcome to Auto-Mart" }));
});

// route.get('/api/v1/cars', (req, res) => {
//     return res.status(200).send(CarController.viewAllCars());
// });

route.post('/api/v1/auth/signup', (req, res) => {
    const user = userController.signup(req.body);
    return res.status(userController.status).send(user);
});

route.post('/api/v1/auth/signin', (req, res) => {
    const user = userController.login(req.body);
    return res.status(userController.status).send(user);
});

route.post('/api/v1/car', imageUploader, (req, res) => {
    const car = CarController.postCar(req.body);
    return res.status(CarController.status).send(car);
});

route.post('/api/v1/order', (req, res) => {
    const order = OrderController.createOrder(req.body);
    return res.status(OrderController.status).send(order);
});

route.patch('/api/v1/order/:id/price', (req, res) => {
    const patchedOrder = OrderController.updatePrice(req.params.id, req.body);
    return res.status(OrderController.status).send(patchedOrder);
});

route.patch('/api/v1/car/:id/status', (req, res) => {
    const sold = CarController.updateStatus(req.params.id, req.body);
    return res.status(CarController.status).send(sold);
});

route.patch('/api/v1/car/:id/price', (req, res) => {
    const price = CarController.updatePrice(req.params.id, req.body);
    return res.status(CarController.status).send(price);
});

export default route;