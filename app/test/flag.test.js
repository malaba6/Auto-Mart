import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';


chai.use(chaiHttp);
const { expect } = chai;

let adminToken;
let userToken;


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
        firstName: 'zahara',
        lastName: 'Mashauri',
        email: 'zahara@gmail.com',
        password: 'zahara12',
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

describe('POST /api/v2/flag', () => {
    it('Should return a 403 error if user does not authonticate', (done) => {
        const flag = {
            reason: 'Wierd price',
            description: 'A brand new car of the same model is much cheaper'
        };

        chai.request(app)
            .post('/api/v2/flag')
            .send(flag)
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

describe('POST /api/v2/flag', () => {
    it('Should return a 403 error if user provide a wrong token', (done) => {
        const flag = {
            reason: 'Wierd price',
            description: 'A brand new car of the same model is much cheaper'
        };

        chai.request(app)
            .post('/api/v2/flag')
            .set('x-access-token', 'fake-token')
            .send(flag)
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

describe('POST /api/v2/flag', () => {
    it('Should return a 400 error message if required fields are not provided', (done) => {
        const flag = {
            reason: 'Wierd price',
            description: 'A brand new car of the same model is much cheaper'
        };

        chai.request(app)
            .post('/api/v2/flag')
            .set('x-access-token', userToken)
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

describe('POST /api/v2/flag', () => {
    it('Should return a 400 error message if required fields are not provided', (done) => {
        const flag = {
            car_id: '7bfc05ce-c15ccc',
            description: 'A brand new car of the same model is much cheaper',
        };

        chai.request(app)
            .post('/api/v2/flag')
            .set('x-access-token', userToken)
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

describe('POST /api/v2/flag', () => {
    it('Should return a 400 error message if required fields are not provided', (done) => {
        const flag = {
            car_id: '7bfc05ce-c15ccc',
            reason: 'Wierd price',
            descriptions: 'A brand new car of the same model is much cheaper',
        };

        chai.request(app)
            .post('/api/v2/flag')
            .set('x-access-token', userToken)
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

describe('POST /api/v2/flag', () => {
    it('Should return a 422 error message if user provides invalid reason', (done) => {
        const flag = {
            car_id: '7bfc05ce-c15ccc',
            reason: '',
            description: 'A brand new car of the same model is much cheaper',
        };

        chai.request(app)
            .post('/api/v2/flag')
            .set('x-access-token', userToken)
            .send(flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(422);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep
                    .equal('Reason must be a string of at least 3 characters');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v2/flag', () => {
    it('Should return a 422 error message if user provides invalid reason', (done) => {
        const flag = {
            car_id: '7bfc05ce-c15ccc',
            reason: 1,
            description: 'A brand new car of the same model is much cheaper',
        };

        chai.request(app)
            .post('/api/v2/flag')
            .set('x-access-token', userToken)
            .send(flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(422);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep
                    .equal('Reason must be a string of at least 3 characters');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v2/flag', () => {
    it('Should return a 422 error message if user provides invalid description', (done) => {
        const flag = {
            car_id: '7bfc05ce-c15ccc',
            reason: 'Wierd price',
            description: 'Expensive',
        };

        chai.request(app)
            .post('/api/v2/flag')
            .set('x-access-token', userToken)
            .send(flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(422);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep
                    .equal('Description must be a string of at least 10 characters');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v2/flag', () => {
    it('Should return a 422 error message if user provides invalid description', (done) => {
        const flag = {
            car_id: '7bfc05ce-c15ccc',
            reason: 'Wierd price',
            description: 1,
        };

        chai.request(app)
            .post('/api/v2/flag')
            .set('x-access-token', userToken)
            .send(flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(422);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep
                    .equal('Description must be a string of at least 10 characters');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v2/flag', () => {
    it('Should return a 422 error message if user provides invalid price', (done) => {
        const flag = {
            car_id: '',
            reason: 'Wierd price',
            description: 'A brand new car of the same model is much cheaper',
        };

        chai.request(app)
            .post('/api/v2/flag')
            .set('x-access-token', userToken)
            .send(flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(422);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Id cannot be an empty string');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v2/flag', () => {
    it('Should return a 404 error if Car id is not found', (done) => {
        const flag = {
            car_id: 'car-id123',
            reason: 'Wierd price',
            description: 'A brand new car of the same model is much cheaper',
        };

        chai.request(app)
            .post('/api/v2/flag')
            .set('x-access-token', userToken)
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

describe('POST /api/v2/flag', () => {
    it('Should return the flag object if successfully created', (done) => {
        const flag = {
            car_id: '7bfc05ce-c15ccc',
            reason: 'Wierd price',
            description: 'A brand new car of the same model is much cheaper',
        };

        chai.request(app)
            .post('/api/v2/flag')
            .set('x-access-token', userToken)
            .send(flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'message', 'data');
                expect(res.body.message).to.deep.equal('Car Ad successfully flagged');
                expect(res.body.data).to.have
                    .keys('id', 'reason', 'carid', 'ownerid', 'description');
                expect(res.body.status).to.deep.equal(201);
                done();
            });
    });
});