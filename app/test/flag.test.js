import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
import Car from "../model/cars";


chai.use(chaiHttp);
const { expect } = chai;

describe("POST /api/v1/flag", () => {
    it("Should return a 400 error message if required fields are not provided", (done) => {
        const flag = {

            // car_id: Car.cars[0].id,
            reason: "Wierd price",
            description: "A brand new car of the same model is much cheaper"

        }

        chai.request(app)
            .post("/api/v1/flag")
            .send(flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Car_id, reason and description are required');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe("POST /api/v1/flag", () => {
    it("Should return a 400 error message if required fields are not provided", (done) => {
        const flag = {

            car_id: Car.cars[0].id,
            // reason: "Wierd price",
            description: "A brand new car of the same model is much cheaper"

        }

        chai.request(app)
            .post("/api/v1/flag")
            .send(flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Car_id, reason and description are required');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe("POST /api/v1/flag", () => {
    it("Should return a 400 error message if required fields are not provided", (done) => {
        const flag = {

            car_id: Car.cars[0].id,
            reason: "Wierd price",
            descriptions: "A brand new car of the same model is much cheaper"

        }

        chai.request(app)
            .post("/api/v1/flag")
            .send(flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Car_id, reason and description are required');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe("POST /api/v1/flag", () => {
    it("Should return a 417 error message if user provides invalid reason", (done) => {
        const flag = {
            car_id: Car.cars[0].id,
            reason: "",
            description: "A brand new car of the same model is much cheaper"
        }

        chai.request(app)
            .post("/api/v1/flag")
            .send(flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(417);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.
                equal('Reason must be a string of at least 3 characters');
                expect(res.body.status).to.deep.equal(417);
                done();
            });
    });
});

describe("POST /api/v1/flag", () => {
    it("Should return a 417 error message if user provides invalid reason", (done) => {
        const flag = {
            car_id: Car.cars[0].id,
            reason: 1,
            description: "A brand new car of the same model is much cheaper"
        }

        chai.request(app)
            .post("/api/v1/flag")
            .send(flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(417);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.
                equal('Reason must be a string of at least 3 characters');
                expect(res.body.status).to.deep.equal(417);
                done();
            });
    });
});

describe("POST /api/v1/flag", () => {
    it("Should return a 417 error message if user provides invalid description", (done) => {
        const flag = {
            car_id: Car.cars[0].id,
            reason: "Wierd price",
            description: "Expensive"
        }

        chai.request(app)
            .post("/api/v1/flag")
            .send(flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(417);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.
                equal('Description must be a string of at least 10 characters');
                expect(res.body.status).to.deep.equal(417);
                done();
            });
    });
});

describe("POST /api/v1/flag", () => {
    it("Should return a 417 error message if user provides invalid description", (done) => {
        const flag = {
            car_id: Car.cars[0].id,
            reason: "Wierd price",
            description: 1
        }

        chai.request(app)
            .post("/api/v1/flag")
            .send(flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(417);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.
                equal('Description must be a string of at least 10 characters');
                expect(res.body.status).to.deep.equal(417);
                done();
            });
    });
});

describe("POST /api/v1/flag", () => {
    it("Should return a 417 error message if user provides invalid price", (done) => {
        const flag = {
            car_id: "",
            reason: "Wierd price",
            description: "A brand new car of the same model is much cheaper"
        }

        chai.request(app)
            .post("/api/v1/flag")
            .send(flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(417);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Id cannot be an empty string');
                expect(res.body.status).to.deep.equal(417);
                done();
            });
    });
});

describe("POST /api/v1/flag", () => {
    it("Should return a 404 error if Car id is not found", (done) => {
        const flag = {
            car_id: "car-id123",
            reason: "Wierd price",
            description: "A brand new car of the same model is much cheaper"
        }

        chai.request(app)
            .post("/api/v1/flag")
            .send(flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Car with id car-id123 not found');
                expect(res.body.status).to.deep.equal(404);
                done();
            });
    });
});

describe("POST /api/v1/flag", () => {
    it("Should return the flag object if successfully created", (done) => {
        const flag = {
            car_id: Car.cars[0].id,
            reason: "Wierd price",
            description: "A brand new car of the same model is much cheaper"
        }

        chai.request(app)
            .post("/api/v1/flag")
            .send(flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.data).to.have.
                keys('id', 'reason', 'car_id', 'description');
                expect(res.body.status).to.deep.equal(201);
                done();
            });
    });
});