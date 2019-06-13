import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';


chai.use(chaiHttp);
const { expect } = chai;

describe('POST /api/v1/auth/signup', () => {
    it('Should return error if user tries to signup with missing fields', (done) => {
        const user = {
            firstName: 'Malaba',
            lastName: 'Mashauri',
            email: 'eric@gmail.com',
            address: 'Kigali',
        };

        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(400);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('firstName, lastName, email and password are required');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe('POST /api/v1/auth/signup', () => {
    it('Should return error if user tries to signup with missing fields', (done) => {
        const user = {
            lastName: 'Mashauri',
            email: 'eric@gmail.com',
            password: 'eric123',
            address: 'Kigali',
        };

        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(400);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('firstName, lastName, email and password are required');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe('POST /api/v1/auth/signup', () => {
    it('Should return error if user tries to signup with missing fields', (done) => {
        const user = {
            firstName: 'eric',
            email: 'eric@gmail.com',
            password: 'eric123',
            address: 'Kigali',
        };

        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(400);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('firstName, lastName, email and password are required');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe('POST /api/v1/auth/signup', () => {
    it('Should return error if user tries to signup with missing fields', (done) => {
        const user = {
            firstName: 'eric',
            lastName: 'Mashauri',
            password: 'eric123',
            address: 'Kigali',
        };

        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(400);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('firstName, lastName, email and password are required');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe('POST /api/v1/auth/signup', () => {
    it('Should return error message if user enters less than 3 characters for first name', (done) => {
        const user = {
            firstName: 'M',
            lastName: 'Mashauri',
            email: 'eric@gmail.com',
            password: 'eric123',
            address: 'Kigali',
        };

        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(422);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Name must be a string at least 3 characters');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/auth/signup', () => {
    it('Should return error message if user includes symbols in first name', (done) => {
        const user = {
            firstName: 'eri^',
            lastName: 'Mashauri',
            email: 'eric@gmail.com',
            password: 'eric123',
            address: 'Kigali',
        };

        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(422);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Name must not contain a special character');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/auth/signup', () => {
    it('Should return error message if user enters less than 3 characters for last name', (done) => {
        const user = {
            firstName: 'Eric',
            lastName: 'Ma',
            email: 'eric@gmail.com',
            password: 'eric123',
            address: 'Kigali',
        };

        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(422);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Name must be a string at least 3 characters');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/auth/signup', () => {
    it('Should return error message if user includes symbols in last name', (done) => {
        const user = {
            firstName: 'eric',
            lastName: 'Mashauri@',
            email: 'eric@gmail.com',
            password: 'eric123',
            address: 'Kigali',
        };

        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(422);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Name must not contain a special character');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/auth/signup', () => {
    it('Should return error message if passwords length is not 6 charaters', (done) => {
        const user = {
            firstName: 'eric',
            lastName: 'Mashauri',
            email: 'eric@gmail.com',
            password: 'eric',
            address: 'Kigali',
        };

        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(422);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Password must be a string of at least 6 characters');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/auth/signup', () => {
    it('Should return error message if email is not of right format', (done) => {
        const user = {
            firstName: 'eric',
            lastName: 'Mashauri',
            email: 'eric@gmailcom',
            password: 'eric123',
            address: 'Kigali',
        };

        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(422);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Email must be of the format eric@gmail.com');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/auth/signup', () => {
    it('Should return error message if email is not of string type', (done) => {
        const user = {
            firstName: 'eric',
            lastName: 'Mashauri',
            email: 1,
            password: 'eric123',
            address: 'Kigali',
        };

        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(422);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Email must be of string type');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/auth/signup', () => {
    it('Should return error message if addres is not of string type', (done) => {
        const user = {
            firstName: 'eric',
            lastName: 'Mashauri',
            email: 'eric@gmail.com',
            password: 'eric123',
            address: 123,
        };

        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(422);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Address must be a string of characters');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});


describe('POST /api/v1/auth/signup', () => {
    it('Should return a 409 error message if user tries uses an existing email', (done) => {
        const user = {
            firstName: 'eric',
            lastName: 'eubule',
            email: 'eric@gmail.com',
            password: 'eric123',
            address: 'Kampala',
        };

        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(409);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Email eric@gmail.com already taken');
                expect(res.body.status).to.deep.equal(409);
                done();
            });
    });
});

describe('POST /api/v1/auth/signup', () => {
    it('Should return user details if user successfully signed up', (done) => {
        const user = {
            firstName: 'mashauri',
            lastName: 'eubule',
            email: 'mashauri@gmail.com',
            password: 'mashauri123',
            address: 'Kampala',
        };

        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(201);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.data).to.have.keys('id', 'firstName', 'lastName',
                    'email', 'password', 'address', 'isAdmin');
                expect(res.body.status).to.deep.equal(201);
                done();
            });
    });
});

describe('POST /api/v1/auth/signup', () => {
    it('Should return user details if user successfully signed up with no address', (done) => {
        const user = {
            firstName: 'erin',
            lastName: 'eubule',
            email: 'erin@gmail.com',
            password: 'erin123',
        };

        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(201);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.data).to.have.keys('id', 'firstName', 'lastName',
                    'email', 'password', 'address', 'isAdmin');
                expect(res.body.status).to.deep.equal(201);
                done();
            });
    });
});

describe('POST /api/v1/auth/signin', () => {
    it('Should return 400 error message if user tries to login with missing fields', (done) => {
        const user = {

            email: 'eric@gmail.com',
            passwords: 'eric123',
        };

        chai.request(app)
            .post('/api/v1/auth/signin')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(400);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('email and password are required');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe('POST /api/v1/auth/signin', () => {
    it('Should return 400 error message if user tries to login with missing fields', (done) => {
        const user = {
            password: 'eric123',
        };

        chai.request(app)
            .post('/api/v1/auth/signin')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(400);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('email and password are required');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe('POST /api/v1/auth/signin', () => {
    it('Should return 422 error message if user tries to login with invalid email', (done) => {
        const user = {

            email: 'eric@gmailcom',
            password: 'eric123',
        };

        chai.request(app)
            .post('/api/v1/auth/signin')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(422);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Email must be of the format eric@gmail.com');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/auth/signin', () => {
    it('Should return 422 error message if user tries to login with wrong type for email', (done) => {
        const user = {

            email: { 'eric@gmail.com': 'eric123' },
            password: 'eric123',
        };

        chai.request(app)
            .post('/api/v1/auth/signin')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(422);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Email must be of string type');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/auth/signin', () => {
    it('Should return 422 error message if user tries to login with short password', (done) => {
        const user = {

            email: 'eric@gmail.com',
            password: 'eric',
        };

        chai.request(app)
            .post('/api/v1/auth/signin')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(422);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Password must be a string of at least 6 characters');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/auth/signin', () => {
    it('Should return 401 error message if user tries to login with wrong email', (done) => {
        const user = {

            email: 'ericy@gmail.com',
            password: 'eric123',
        };

        chai.request(app)
            .post('/api/v1/auth/signin')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(401);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Email or password Incorrect');
                expect(res.body.status).to.deep.equal(401);
                done();
            });
    });
});

describe('POST /api/v1/auth/signin', () => {
    it('Should return 401 error message if user tries to login with wrong password', (done) => {
        const user = {

            email: 'eric@gmail.com',
            password: 'ericy123',
        };

        chai.request(app)
            .post('/api/v1/auth/signin')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(401);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Email or password Incorrect');
                expect(res.body.status).to.deep.equal(401);
                done();
            });
    });
});

describe('POST /api/v1/auth/signin', () => {
    it('Should return 200 code and user details if user successfully logs in', (done) => {
        const user = {

            email: 'eric@gmail.com',
            password: 'admin12',
        };

        chai.request(app)
            .post('/api/v1/auth/signin')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).have.status(200);
                expect(res).to.be.an('object');
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.data).to.have.keys('id', 'firstName', 'lastName',
                    'email', 'password', 'address', 'isAdmin');
                expect(res.body.data.isAdmin).to.deep.equal(true);
                expect(res.body.status).to.deep.equal(200);
                done();
            });
    });
});