import express from 'express';
import CarController from '../controller/carController';
import FlagController from '../controller/flagController';
import userController from '../controller/userController';
import asyncWrapper from "../middleware/asyncMiddleware";
import { imageUploader, postCarValidator, deleteImage, authencate } from '../middleware/middlewares';
import OrderController from '../controller/orderController';

const route = express.Router();

route.post('/api/v2/auth/signup', asyncWrapper(async(req, res, next) => {
    const user = await userController.signup(req.body);
    return res.status(userController.status).send(user);
}));

route.post('/api/v2/auth/signin', asyncWrapper(async(req, res, next) => {
    const user = await userController.login(req.body);
    return res.status(userController.status).send(user);
}));

route.post('/api/v2/car', authencate, postCarValidator, imageUploader, asyncWrapper(async(req, res, next) => {
    const car = await CarController.postCar(req.body, req.decoded);
    return res.status(CarController.status).send(car);
}));

route.post('/api/v2/order', authencate, asyncWrapper(async(req, res, next) => {
    const order = await OrderController.createOrder(req.body, req.decoded);
    return res.status(OrderController.status).send(order);
}));

route.post('/api/v2/flag', authencate, asyncWrapper(async(req, res, next) => {
    const flag = await FlagController.createFlag(req.body, req.decoded);
    return res.status(FlagController.status).send(flag);
}));

route.patch('/api/v2/order/:id/price', authencate, asyncWrapper(async(req, res, next) => {
    const patchedOrder = await OrderController.updatePrice(req.params.id, req.body, req.decoded);
    return res.status(OrderController.status).send(patchedOrder);
}));

route.patch('/api/v2/car/:id/status', authencate, asyncWrapper(async(req, res, next) => {
    const sold = await CarController.updateStatus(req.params.id, req.body, req.decoded);
    return res.status(CarController.status).send(sold);
}));

route.patch('/api/v2/car/:id/price', authencate, asyncWrapper(async(req, res, next) => {
    const price = await CarController.updatePrice(req.params.id, req.body, req.decoded);
    return res.status(CarController.status).send(price);
}));

route.get('/api/v2/car/:id', authencate, asyncWrapper(async(req, res, next) => {
    const car = await CarController.viewSpecificCar(req.params.id);
    return res.status(CarController.status).send(car);
}));

route.get('/api/v2/car', authencate, asyncWrapper(async(req, res, next) => {
    const car = await CarController.viewCars(req.query, req.decoded);
    return res.status(CarController.status).send(car);
}));

route.delete('/api/v2/car/:id', authencate, asyncWrapper(deleteImage), asyncWrapper(async(req, res, next) => {
    const car = await CarController.deleteCar(req.params.id, req.decoded);
    return res.status(CarController.status).send(car);
}));

export default route;