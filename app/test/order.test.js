import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
import Car from "../model/cars";


chai.use(chaiHttp);
const { expect } = chai;

describe("POST /api/v1/order", () => {
    it("Should return a 400 error message if required fields are not provided", (done) => {
        const order = {

            car_id: "b8aa4d11-baa4-4d6a",
            proposed_price: 8000

        }

        chai.request(app)
            .post("/api/v1/order")
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Car_id and offered_price are required');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe("POST /api/v1/order", () => {
    it("Should return a 400 error message if required fields are not provided", (done) => {
        const order = {
            offered_price: 8000

        }

        chai.request(app)
            .post("/api/v1/order")
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Car_id and offered_price are required');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe("POST /api/v1/order", () => {
    it("Should return a 417 error message if user provides wrong value for offered_price", (done) => {
        const order = {
            car_id: "b8aa4d11-baa4-4d6b",
            offered_price: 0,
        }

        chai.request(app)
            .post("/api/v1/order")
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(417);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Price must be a number greater than 0');
                expect(res.body.status).to.deep.equal(417);
                done();
            });
    });
});

describe("POST /api/v1/order", () => {
    it("Should return a 404 error message if car id is not found", (done) => {
        const order = {
            car_id: "b8aa4d11-baa4-4",
            offered_price: 6000,
        }

        chai.request(app)
            .post("/api/v1/order")
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Car with id b8aa4d11-baa4-4 not found');
                expect(res.body.status).to.deep.equal(404);
                done();
            });
    });
});

describe("POST /api/v1/order", () => {
    it("Should return a 201 message if order was successfully created", (done) => {
        const order = {
            car_id: Car.cars[0].id,
            offered_price: 6000,
        }

        chai.request(app)
            .post("/api/v1/order")
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.data).to.have.
                keys('price', 'offered_price', 'car_id', 'id', 'createdOn', 'status');
                expect(res.body.status).to.deep.equal(201);
                done();
            });
    });
});

describe("PATCH /api/v1/order/b8aa4d11/price", () => {
    it("Should return a 400 error message if required fields are not provided", (done) => {
        const order = {
            proposed_price: 8000

        }


        chai.request(app)
            .patch("/api/v1/order/b8aa4d11/price")
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('offered_price is required in the request');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe("PATCH /api/v1/order/b8aa4d11/price", () => {
    it("Should return a 417 error message if user provides wrong value for offered_price", (done) => {
        const order = {
            offered_price: "three hundred thousand",
        }

        chai.request(app)
            .patch("/api/v1/order/b8aa4d11/price")
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(417);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Price must be a number greater than 0');
                expect(res.body.status).to.deep.equal(417);
                done();
            });
    });
});

describe("PATCH /api/v1/order/b8aa4d1/price", () => {
    it("Should return a 404 error message if order id is not found", (done) => {
        const order = {
            offered_price: 9000,
        }

        chai.request(app)
            .patch("/api/v1/order/b8aa4d1/price")
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Order with id b8aa4d1 not found');
                expect(res.body.status).to.deep.equal(404);
                done();
            });
    });
});

describe("PATCH /api/v1/order/b8aa4d22/price", () => {
    it("Should return a message with 404 code if the car ordered is no longer available", (done) => {
        const order = {
            offered_price: 9000,
        }

        chai.request(app)
            .patch("/api/v1/order/b8aa4d22/price")
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.message).to.deep.equal('This car Ad is no longer available');
                expect(res.body.status).to.deep.equal(404);
                done();
            });
    });
});

describe("PATCH /api/v1/order/b8aa4d11/price", () => {
    it("Should return the order object if successfully apdated the price", (done) => {
        const order = {
            offered_price: 9000,
        }

        chai.request(app)
            .patch("/api/v1/order/b8aa4d11/price")
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.data).to.have.
                keys('price', 'offered_price', 'car_id', 'id', 'createdOn', 'status', 'old_price_offered');
                expect(res.body.status).to.deep.equal(200);
                done();
            });
    });
});