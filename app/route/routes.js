import express from "express";
import CarController from "../controller/carController";
import OrderController from "../controller/orderController";
import FlagController from "../controller/flagController";
import userController from "../controller/userController";
import { imageUploader, postCarValidator, deleteImage } from "../middleware/middlewares";

const route = express.Router();

route.get('/', (req, res) => {
    return res.status(200).send(({ "message": "Welcome to Auto-Mart" }));
});

route.post('/api/v1/auth/signup', (req, res) => {
    const user = userController.signup(req.body);
    return res.status(userController.status).send(user);
});

route.post('/api/v1/auth/signin', (req, res) => {
    const user = userController.login(req.body);
    return res.status(userController.status).send(user);
});

route.post('/api/v1/car', postCarValidator, imageUploader, (req, res) => {
    const car = CarController.postCar(req.body);
    return res.status(CarController.status).send(car);
});

route.post('/api/v1/order', (req, res) => {
    const order = OrderController.createOrder(req.body);
    return res.status(OrderController.status).send(order);
});

route.post('/api/v1/flag', (req, res) => {
    const flag = FlagController.createFlag(req.body);
    return res.status(FlagController.status).send(flag);
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

route.get('/api/v1/car/:id', (req, res) => {
    return res.status(CarController.status).send(CarController.viewSpecificCar(req.params.id));
});

route.get('/api/v1/car', (req, res) => {
    return res.status(CarController.status).send(CarController.viewCars(req.query));
});

route.delete('/api/v1/car/:id', deleteImage, (req, res) => {
    return res.status(CarController.status).send(CarController.deleteCar(req.params.id));
});

export default route;