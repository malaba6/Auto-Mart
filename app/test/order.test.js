import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import Car from '../model/orders';


chai.use(chaiHttp);
const { expect } = chai;

let adminToken;
let userToken;
let userToken2;


before(done => {
    const user = {
        email: 'admin@automart.com',
        password: 'admin12',
    };
    chai.request(app)
        .post('/api/v2/auth/signin')
        .send(user)
        .end((err, res) => {
            if (err) done(err);
            adminToken = res.body.data.token;
            done();
        });

});

before(done => {
    const user = {
        email: 'user@automart.com',
        password: 'admin12',
    };
    chai.request(app)
        .post('/api/v2/auth/signin')
        .send(user)
        .end((err, res) => {
            if (err) done(err);
            userToken2 = res.body.data.token;
            done();
        });

});

before(done => {
    const user = {
        firstName: 'lisa',
        lastName: 'longin',
        email: 'lisa@gmail.com',
        password: 'lisa12',
        address: 'Canada'
    };
    chai.request(app)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
            userToken = res.body.data.token;
            done();
        });

});

describe('POST /api/v2/order', () => {
    it('Should return a 403 error if no token is provided', (done) => {
        const order = {

            car_id: 'b8aa4d11-baa4-4d6a',
            proposed_price: 8000,

        };

        chai.request(app)
            .post('/api/v2/order')
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(403);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep
                    .equal('You must login to access this resource');
                expect(res.body.status).to.deep.equal(403);
                done();
            });
    });
});

describe('POST /api/v2/order', () => {
    it('Should return a 401 error message if user provided wrong token', (done) => {
        const order = {

            car_id: 'b8aa4d11-baa4-4d6a',
            proposed_price: 8000

        };

        chai.request(app)
            .post('/api/v2/order')
            .set('x-access-token', 'fake-token')
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(401);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Token is invalid');
                expect(res.body.status).to.deep.equal(401);
                done();
            });
    });
});


describe('POST /api/v2/order', () => {
    it('Should return a 400 error message if required fields are not provided', (done) => {
        const order = {

            car_id: 'b8aa4d11-baa4-4d6a',
            proposed_price: 8000

        };

        chai.request(app)
            .post('/api/v2/order')
            .set('x-access-token', userToken)
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

describe('POST /api/v2/order', () => {
    it('Should return a 400 error message if required fields are not provided', (done) => {
        const order = {
            offered_price: 8000,

        };

        chai.request(app)
            .post('/api/v2/order')
            .set('x-access-token', userToken)
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

describe('POST /api/v2/order', () => {
    it('Should return a 422 error message if user provides wrong value for offered_price', (done) => {
        const order = {
            car_id: 'b8aa4d11-baa4-4d6b',
            offered_price: 0,
        };

        chai.request(app)
            .post('/api/v2/order')
            .set('x-access-token', userToken)
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(422);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Price must be a number greater than 0');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v2/order', () => {
    it('Should return a 404 error message if car id is not found', (done) => {
        const order = {
            car_id: 'b8aa4d11-baa4-4',
            offered_price: 6000,
        };

        chai.request(app)
            .post('/api/v2/order')
            .set('x-access-token', adminToken)
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

describe('POST /api/v2/order', () => {
    it('Should return error message if ser tries to ordera car he owns', (done) => {
        const order = {
            car_id: '7bfc05ce',
            offered_price: 6000
        };

        chai.request(app)
            .post('/api/v2/order')
            .set('x-access-token', adminToken)
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(403);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('You cannot order a car you own');
                expect(res.body.status).to.deep.equal(403);
                done();
            });
    });
});


describe('POST /api/v2/order', () => {
    it('Should return a 201 message if order was successfully created', (done) => {
        const order = {
            car_id: '7bfc05ce-c15ccc',
            offered_price: 6000
        };

        chai.request(app)
            .post('/api/v2/order')
            .set('x-access-token', userToken)
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'message', 'data');
                expect(res.body.data).to.have
                    .keys('price', 'ownerid', 'offeredprice', 'carid', 'id', 'createdon', 'status');
                expect(res.body.status).to.deep.equal(201);
                done();
            });
    });
});

describe('POST /api/v2/order', () => {
    it('Should return a 403 error if user try to order a car they own', (done) => {
        const order = {
            car_id: '7bfc05ce-c15ccc',
            offered_price: 6000
        };

        chai.request(app)
            .post('/api/v2/order')
            .set('x-access-token', adminToken)
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'message', 'data');
                expect(res.body.data).to.have
                    .keys('price', 'ownerid', 'offeredprice', 'carid', 'id', 'createdon', 'status');
                expect(res.body.status).to.deep.equal(201);
                done();
            });
    });
});


describe('PATCH /api/v2/order/b8aa4d11/price', () => {
    it('Should return a 400 error message if required fields are not provided', (done) => {
        const order = {
            proposed_price: 8000
        };
        chai.request(app)
            .patch('/api/v2/order/7bfc05ce-c15aar/price')
            .set('x-access-token', userToken)
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

describe('PATCH /api/v2/order/b8aa4d11/price', () => {
    it('Should return a 422 error message if user provides wrong value for offered_price', (done) => {
        const order = {
            offered_price: 'three hundred thousand',
        };

        chai.request(app)
            .patch('/api/v2/order/b8aa4d11/price')
            .set('x-access-token', userToken)
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(422);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Price must be a number greater than 0');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('PATCH /api/v2/order/b8aa4d1/price', () => {
    it('Should return a 404 error message if order id is not found', (done) => {
        const order = {
            offered_price: 9000,
        };

        chai.request(app)
            .patch('/api/v2/order/b8aa4d1/price')
            .set('x-access-token', userToken) //             
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

describe('PATCH /api/v2/order/b8aa4d22/price', () => {
    it('Should return the order object if successfully apdated the price', (done) => {
        const order = {
            offered_price: 9000,
        };
        const car = {
            status: 'available',
        }

        chai.request(app)
            .patch('/api/v2/car/7bfc05ce-c15ccc/status')
            .set('x-access-token', userToken2) //             
            .send(car)

        chai.request(app)
            .patch('/api/v2/order/7bfc05ce-c15aar/price')
            .set('x-access-token', adminToken) //             
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'message', 'data');
                expect(res.body.message).to.deep.equal('Price successfully updated');
                expect(res.body.data).to.have.keys('offeredprice', 'price',
                    'carid', 'id', 'createdon',
                    'status', 'ownerid');
                expect(res.body.status).to.deep.equal(200);
                done();
            });
    });
});

describe('PATCH /api/v2/order/b8aa4d22/price', () => {
    it('Should return error if user tries to update an order they do not own', (done) => {
        const order = {
            offered_price: 9000,
        };

        chai.request(app)
            .patch('/api/v2/order/7bfc05ce-c15aar/price')
            .set('x-access-token', userToken)
            .send(order)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(403);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('You cannot update a purchase order you do not own');
                expect(res.body.status).to.deep.equal(403);
                done();
            });
    });
});

describe('PATCH /api/v2/order/b8aa4d22/price', () => {
    it('Should return error if user tries to update a sold car', (done) => {
        const order = {
            offered_price: 9000,
        };

        chai.request(app)
            .patch('/api/v2/order/7bfc05ce-c15vbr/price')
            .set('x-access-token', userToken2)
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