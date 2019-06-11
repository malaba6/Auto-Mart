import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import Car from '../model/cars';


chai.use(chaiHttp);
const { expect } = chai;

describe('POST /api/v1/car', () => {
    it('Should return a 400 error message if required fields are not provided', (done) => {
        const car = {
            state: 'new',
            model: 'cs',
            manufacturer: 'Toyota',
            type: 'Car',
            photo: 'https://malaba6.github.io/Auto-Mart/img/ford.jpg',
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep
                    .equal('state, price, manufactuere, model, type and photo are required');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe('POST /api/v1/car', () => {
    it('Should return a 400 error message if required fields are not provided', (done) => {
        const car = {
            model: 'cs',
            manufacturer: 'Toyota',
            type: 'Car',
            price: 10000,
            photo: 'https://malaba6.github.io/Auto-Mart/img/ford.jpg',
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep
                    .equal('state, price, manufactuere, model, type and photo are required');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe('POST /api/v1/car', () => {
    it('Should return a 400 error message if required fields are not provided', (done) => {
        const car = {
            state: 'new',
            manufacturer: 'Toyota',
            type: 'Car',
            price: 10000,
            photo: 'https://malaba6.github.io/Auto-Mart/img/ford.jpg',
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep
                    .equal('state, price, manufactuere, model, type and photo are required');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe('POST /api/v1/car', () => {
    it('Should return a 400 error message if required fields are not provided', (done) => {
        const car = {
            state: 'new',
            model: 'cs',
            type: 'Car',
            price: 10000,
            photo: 'https://malaba6.github.io/Auto-Mart/img/ford.jpg',
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep
                    .equal('state, price, manufactuere, model, type and photo are required');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe('POST /api/v1/car', () => {
    it('Should return a 400 error message if required fields are not provided', (done) => {
        const car = {
            state: 'new',
            model: 'cs',
            manufacturer: 'Toyota',
            price: 10000,
            photo: 'https://malaba6.github.io/Auto-Mart/img/ford.jpg',
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep
                    .equal('state, price, manufactuere, model, type and photo are required');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe('POST /api/v1/car', () => {
    it('Should return a 400 error message if required fields are not provided', (done) => {
        const car = {
            state: 'new',
            model: 'cs',
            manufacturer: 'Toyota',
            type: 'Car',
            price: 10000,
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep
                    .equal('state, price, manufactuere, model, type and photo are required');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe('POST /api/v1/car', () => {
    it('Should return a 422 error message if user provides wrong value for state', (done) => {
        const car = {
            state: 'California',
            model: 'cs',
            manufacturer: 'Toyota',
            type: 'Car',
            price: 10000,
            photo: 'https://malaba6.github.io/Auto-Mart/img/ford.jpg',
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(422);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('State must be either new or used');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/car', () => {
    it('Should return a 422 error message if user provides wrong value for model', (done) => {
        const car = {
            state: 'new',
            model: '',
            manufacturer: 'Toyota',
            type: 'Car',
            price: 10000,
            photo: 'https://malaba6.github.io/Auto-Mart/img/ford.jpg',
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(422);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Model must be a string of characters not null');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/car', () => {
    it('Should return a 422 error message if user provides wrong value for manufacturer', (done) => {
        const car = {
            state: 'new',
            model: 'Corolla S',
            manufacturer: '',
            type: 'Car',
            price: 13000,
            photo: 'https://malaba6.github.io/Auto-Mart/img/ford.jpg',
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(422);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Manufacturer must be a string of characters not null');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/car', () => {
    it('Should return a 422 error message if user provides wrong value for manufacturer', (done) => {
        const car = {
            state: 'new',
            model: 'Corolla S',
            manufacturer: 1,
            type: 'Car',
            price: 13000,
            photo: 'https://malaba6.github.io/Auto-Mart/img/ford.jpg',
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(422);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Manufacturer must be a string of characters not null');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/car', () => {
    it('Should return a 422 error message if user provides wrong value for type', (done) => {
        const car = {
            state: 'new',
            model: 'Corolla S',
            manufacturer: 'Toyota',
            type: '',
            price: 13000,
            photo: 'https://malaba6.github.io/Auto-Mart/img/ford.jpg',
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(422);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Type must be a string of characters not null');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/car', () => {
    it('Should return a 422 error message if user provides wrong value for Type', (done) => {
        const car = {
            state: 'new',
            model: 'Corolla S',
            manufacturer: 'Toyota',
            type: { type: 'Car' },
            price: 13000,
            photo: 'https://malaba6.github.io/Auto-Mart/img/ford.jpg',
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(422);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Type must be a string of characters not null');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/car', () => {
    it('Should return a 422 error message if user provides wrong value for price', (done) => {
        const car = {
            state: 'new',
            model: 'Corolla S',
            manufacturer: 'Toyota',
            type: 'Car',
            price: 0,
            photo: 'https://malaba6.github.io/Auto-Mart/img/ford.jpg',
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
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

describe('POST /api/v1/car', () => {
    it('Should return a 422 error message if user provides wrong value for price', (done) => {
        const car = {
            state: 'new',
            model: 'Corolla S',
            manufacturer: 'Toyota',
            type: 'Car',
            price: 'trenty',
            photo: 'https://malaba6.github.io/Auto-Mart/img/ford.jpg',
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
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

describe('POST /api/v1/car', () => {
    it('Should return a 422 error message if user provides wrong url for photo', (done) => {
        const car = {
            state: 'new',
            model: 'Corolla S',
            manufacturer: 'Toyota',
            type: 'Car',
            price: 12000,
            photo: '',
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(422);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('The Photo Url must be a string of characters not null');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/car', () => {
    it('Should return a 422 error message if user provides wrong url for photo', (done) => {
        const car = {
            state: 'new',
            model: 'Corolla S',
            manufacturer: 'Toyota',
            type: 'Car',
            price: 12000,
            photo: 123,
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(422);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('The Photo Url must be a string of characters not null');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/car', () => {
    it('Should return a 422 error message if user provides wrong url for photo', (done) => {
        const car = {
            state: 'new',
            model: 'Corolla S',
            manufacturer: 'Toyota',
            type: 'Car',
            price: 12000,
            photo: 'https://malaba6.github.io/Auto-Mart/img/ford.mp3',
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(422);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Image must be one of these formats .jpg .png .jpeg');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('POST /api/v1/car', () => {
    it('Should return a 422 error message if user provides url of image that does not exist', (done) => {
        const car = {
            state: 'new',
            model: 'Corolla S',
            manufacturer: 'Toyota',
            type: 'Car',
            price: 12000,
            photo: 'https://malaba6.github.io/Auto-Mart/img/for.jpg',
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(422);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep
                    .equal('Could not find image https://malaba6.github.io/Auto-Mart/img/for.jpg');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('GET /api/v1/car', () => {
    it('Should return all cars when user tries to fetch them', (done) => {
        chai.request(app)
            .get('/api/v1/car')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.data[0]).to.have
                    .keys('state', 'price', 'manufacturer', 'model', 'type', 'photo', 'id', 'createdOn', 'status');
                expect(res.body.status).to.deep.equal(200);
                done();
            });
    });
});

describe('GET /api/v1/car?status=sold', () => {
    it('Should return 403 error if user tries to query the sold cars', (done) => {
        chai.request(app)
            .get('/api/v1/car?status=sold')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('You have no authorization to view this');
                expect(res.body.status).to.deep.equal(403);
                done();
            });
    });
});

describe('GET /api/v1/car?status=available', () => {
    it('Should return all the unsold cars when user queries them', (done) => {
        chai.request(app)
            .get('/api/v1/car?status=available')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.data[0]).to.have
                    .keys('state', 'price', 'manufacturer', 'model', 'type', 'photo', 'id', 'createdOn', 'status');
                expect(res.body.status).to.deep.equal(200);
                done();
            });
    });
});

describe('GET /api/v1/car?status=available&min_price=9000&max_price=8000', () => {
    it('Should return error if user queries cars with min_price greater than max_price', (done) => {
        chai.request(app)
            .get('/api/v1/car?status=available&min_price=9000&max_price=8000')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Min price must be less than Max price');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('GET /api/v1/car?status=available&min_price=-1&max_price=8000', () => {
    it('Should return error if user queries cars with invalid min_price or max_price', (done) => {
        chai.request(app)
            .get('/api/v1/car?status=available&min_price=-1&max_price=8000')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Max and Min price must be positive numbers');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('GET /api/v1/car?status=available&min_price=one&max_price=8000', () => {
    it('Should return error if user queries cars with invalid min_price or max_price', (done) => {
        chai.request(app)
            .get('/api/v1/car?status=available&min_price=one&max_price=8000')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Max and Min price must be positive numbers');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('GET /api/v1/car?status=available&min_price=9000&max_price=one', () => {
    it('Should return error if user queries cars with invalid min_price or max_price', (done) => {
        chai.request(app)
            .get('/api/v1/car?status=available&min_price=9000&max_price=one')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Max and Min price must be positive numbers');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('GET /api/v1/car?status=available&min_price=9000&max_price=-1', () => {
    it('Should return error if user queries cars with invalid min_price or max_price', (done) => {
        chai.request(app)
            .get('/api/v1/car?status=available&min_price=9000&max_price=-1')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Max and Min price must be positive numbers');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('GET /api/v1/car?status=available&min_price=0&max_price=0', () => {
    it('Should return 404 code if no cars are found correspondind to the query', (done) => {
        chai.request(app)
            .get('/api/v1/car?status=available&min_price=0&max_price=0')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.message).to.deep.equal('Oh oh! No cars within that range');
                expect(res.body.status).to.deep.equal(404);
                done();
            });
    });
});

describe('GET /api/v1/car?status=available&min_price=5000&max_price=100000', () => {
    it('Should return cars with the specified max and min range', (done) => {
        chai.request(app)
            .get('/api/v1/car?status=available&min_price=5000&max_price=100000')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.data[0]).to.have
                    .keys('state', 'price', 'manufacturer', 'model', 'type', 'photo', 'id', 'createdOn', 'status');
                expect(res.body.status).to.deep.equal(200);
                done();
            });
    });
});

describe('GET /api/v1/car?status=available&state=use', () => {
    it('Should return 422 error if user queries with inalid state', (done) => {
        chai.request(app)
            .get('/api/v1/car?status=available&state=use')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('State must be either new or used');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('GET /api/v1/car?status=available&state=new', () => {
    it('Should return 404 error if user queried state is not found ', (done) => {
        chai.request(app)
            .get('/api/v1/car?status=available&state=new')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.message).to.deep.equal('Oh oh! No new cars here yet');
                expect(res.body.status).to.deep.equal(404);
                done();
            });
    });
});

describe('GET /api/v1/car?status=available&state=used', () => {
    it('Should return all the cars when user query matches the state ', (done) => {
        chai.request(app)
            .get('/api/v1/car?status=available&state=used')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.data[0]).to.have
                    .keys('state', 'price', 'manufacturer', 'model', 'type', 'photo', 'id', 'createdOn', 'status');
                expect(res.body.status).to.deep.equal(200);
                done();
            });
    });
});

describe('GET /api/v1/car?status=available&manufacturer=Limbo', () => {
    it('Should return 404 error if user queried manufacturer is not found', (done) => {
        chai.request(app)
            .get('/api/v1/car?status=available&manufacturer=Limbo')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.message).to.deep.equal('Oh oh! No Limbo cars here yet');
                expect(res.body.status).to.deep.equal(404);
                done();
            });
    });
});

describe('GET /api/v1/car?status=available&manufacturer=VolksWagon', () => {
    it('Should return all the cars when user query matches the manufacturer', (done) => {
        chai.request(app)
            .get('/api/v1/car?status=available&manufacturer=VolksWagon')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.data[0]).to.have
                    .keys('state', 'price', 'manufacturer', 'model', 'type', 'photo', 'id', 'createdOn', 'status');
                expect(res.body.status).to.deep.equal(200);
                done();
            });
    });
});

describe('GET /api/v1/car?status=available&type=Car', () => {
    it('Should return 404 error if user queried type is not found', (done) => {
        chai.request(app)
            .get('/api/v1/car?status=available&type=Car')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.message).to.deep.equal('Oh oh! No Car cars here yet');
                expect(res.body.status).to.deep.equal(404);
                done();
            });
    });
});

describe('GET /api/v1/car?status=available&type=truck', () => {
    it('Should return all the cars when user query matches the type', (done) => {
        chai.request(app)
            .get('/api/v1/car?status=available&type=truck')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.data[0]).to.have
                    .keys('state', 'price', 'manufacturer', 'model', 'type', 'photo', 'id', 'createdOn', 'status');
                expect(res.body.status).to.deep.equal(200);
                done();
            });
    });
});

describe('PATCH /api/v1/car/:b8aa4d11-baa4-4d6a/status', () => {
    it('Should return 400 error if user tries to update status with missing fields', (done) => {
        const car = { statu: 'sold' };

        chai.request(app)
            .patch('/api/v1/car/b8aa4d11-baa4-4d6a/status')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('status is required in the request');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe('PATCH /api/v1/car/:b8aa4d11-baa4-4d6a/status', () => {
    it('Should return 422 error if user tries to update status with invalid status', (done) => {
        const car = { status: 89999 };

        chai.request(app)
            .patch('/api/v1/car/b8aa4d11-baa4-4d6a/status')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Status must be a string of characters not null');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('PATCH /api/v1/car/:b8aa4d11-baa4-4d6a/status', () => {
    it('Should return 422 error if user tries to update status with invalid status', (done) => {
        const car = { status: '' };

        chai.request(app)
            .patch('/api/v1/car/b8aa4d11-baa4-4d6a/status')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Status must be a string of characters not null');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('PATCH /api/v1/car/b8aa4d11-baa4-4d6a/status', () => {
    it('Should return 422 error if user tries to update status with invalid status', (done) => {
        const car = { status: 'beautiful' };

        chai.request(app)
            .patch('/api/v1/car/b8aa4d11-baa4-4d6a/status')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Status must be either available or sold');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('PATCH /api/v1/car/b8aa4d11-baa/status', () => {
    it('Should return 404 if specified car id does not exist ', (done) => {
        const car = { status: 'sold' };

        chai.request(app)
            .patch('/api/v1/car/b8aa4d11-baa/status')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Car with id b8aa4d11-baa not found');
                expect(res.body.status).to.deep.equal(404);
                done();
            });
    });
});

describe('PATCH /api/v1/car/b8aa4d11-baa4-4d6a/status', () => {
    it('Should return Car object if all is checked', (done) => {
        const car = { status: 'sold' };

        chai.request(app)
            .patch('/api/v1/car/b8aa4d11-baa4-4d6a/status')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.data).to.have
                    .keys('state', 'price', 'manufacturer', 'model', 'type', 'id', 'createdOn', 'status');
                expect(res.body.status).to.deep.equal(200);
                done();
            });
    });
});

describe('PATCH /api/v1/car/:b8aa4d11-baa4-4d6a/price', () => {
    it('Should return 400 error if user tries to update price with missing fields', (done) => {
        const car = { prise: 65000 };

        chai.request(app)
            .patch('/api/v1/car/b8aa4d11-baa4-4d6a/price')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('price is required in the request');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe('PATCH /api/v1/car/:b8aa4d11-baa4-4d6a/price', () => {
    it('Should return 422 error if user tries to update status with invalid price', (done) => {
        const car = { price: 'one hundred thousand' };

        chai.request(app)
            .patch('/api/v1/car/b8aa4d11-baa4-4d6a/price')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Price must be a number greater than 0');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('PATCH /api/v1/car/:b8aa4d11-baa4-4d6a/price', () => {
    it('Should return 422 error if user tries to update status with invalid price', (done) => {
        const car = { price: -54000 };

        chai.request(app)
            .patch('/api/v1/car/b8aa4d11-baa4-4d6a/price')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Price must be a number greater than 0');
                expect(res.body.status).to.deep.equal(422);
                done();
            });
    });
});

describe('PATCH /api/v1/car/b8aa4d11-baa/price', () => {
    it('Should return 404 if specified car id does not exist ', (done) => {
        const car = { price: 65000 };

        chai.request(app)
            .patch('/api/v1/car/b8aa4d11-baa/price')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Car with id b8aa4d11-baa not found');
                expect(res.body.status).to.deep.equal(404);
                done();
            });
    });
});

describe('PATCH /api/v1/car/b8aa4d11-baa4-4d6a/price', () => {
    it('Should return Car object if id and price are valid', (done) => {
        const car = { price: 65000 };

        chai.request(app)
            .patch('/api/v1/car/b8aa4d11-baa4-4d6a/price')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.data).to.have
                    .keys('state', 'price', 'manufacturer', 'model', 'type', 'id', 'createdOn', 'status');
                expect(res.body.status).to.deep.equal(200);
                done();
            });
    });
});

describe('GET /api/v1/car/b8aa4d11-baa', () => {
    it('Should return a 404 error if user tries to fetch a non existing car', (done) => {
        chai.request(app)
            .get('/api/v1/car/b8aa4d11-baa')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Car with id b8aa4d11-baa not found');
                expect(res.body.status).to.deep.equal(404);
                done();
            });
    });
});

describe('GET /api/v1/car/b8aa4d11-baa4-4d6a', () => {
    it('Should return the car object if id is found', (done) => {
        chai.request(app)
            .get('/api/v1/car/b8aa4d11-baa4-4d6a')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.data).to.have
                    .keys('state', 'price', 'manufacturer', 'model', 'type', 'photo', 'id', 'createdOn', 'status');
                expect(res.body.status).to.deep.equal(200);
                done();
            });
    });
});

describe('DELETE /api/v1/car/1', () => {
    it('Should return a 404 error if user tries to delete a non existing car', (done) => {
        chai.request(app)
            .delete('/api/v1/car/1')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep.equal('Car with id 1 not found');
                expect(res.body.status).to.deep.equal(404);
                done();
            });
    });
});

describe('DELETE /api/v1/car/b8aa4d11-baa4-4d6a', () => {
    it('Should return a success message if the car id to delete is found', (done) => {
        chai.request(app)
            .delete('/api/v1/car/b8aa4d11-baa4-4d6a')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.message).to.deep.equal('Car Ad successfully deleted');
                expect(res.body.status).to.deep.equal(200);
                done();
            });
    });
});

describe('GET /api/v1/car?status=available', () => {
    it('Should return 404 error if there are no unsold cars', (done) => {
        Car.clearCars();
        chai.request(app)
            .get('/api/v1/car?status=available')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.message).to.deep.equal('Oh oh! No cars Posted here yet!');
                expect(res.body.status).to.deep.equal(404);
                done();
            });
    });
});

describe('GET /api/v1/car?status=available', () => {
    it('Should return 404 error if there are no unsold cars', (done) => {
        Car.clearCars();
        chai.request(app)
            .get('/api/v1/car?status=available')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.message).to.deep.equal('Oh oh! No cars Posted here yet!');
                expect(res.body.status).to.deep.equal(404);
                done();
            });
    });
});

describe('GET /api/v1/car', () => {
    it('Should return a message if user can view unsold cars when there is none', (done) => {
        chai.request(app)
            .get('/api/v1/car')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.message).to.deep.equal('Oops! It is lonely here!');
                expect(res.body.status).to.deep.equal(200);
                done();
            });
    });
});

describe('GET /api/v1/car?status=unsold&types=Car', () => {
    it('Should return 400 error if user uses invalid query', (done) => {
        chai.request(app)
            .get('/api/v1/car?status=unsold&types=Car')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.error).to.deep
                    .equal('Invalid query. We could not find what you are looking for');
                expect(res.body.status).to.deep.equal(400);
                done();
            });
    });
});

describe('POST /api/v1/car', () => {
    it('Should return a 201 code plus details of the car sale ad created', (done) => {
        const car = {
            state: 'new',
            model: 'Corolla S',
            manufacturer: 'Toyota',
            type: 'Car',
            price: 12000,
            photo: 'https://malaba6.github.io/Auto-Mart/img/ford.jpg',
        };

        chai.request(app)
            .post('/api/v1/car')
            .send(car)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.data).to.have
                    .keys('state', 'price', 'manufacturer', 'model', 'type', 'photo', 'id', 'createdOn', 'status');
                expect(res.body.status).to.deep.equal(201);
                done();
            });
    });
});