import faker from 'faker';
import supertest from 'supertest';
import { expect } from 'chai';
import express from 'express';
import respond from '../src';

const app = express();
app.use(respond);

// assert respond
const assertRespond = (request, response) => {
  // 2xx methods
  expect(response.ok).to.be.a('function');
  expect(response.created).to.be.a('function');
  expect(response.accepted).to.be.a('function');
  expect(response.noContent).to.be.a('function');

  // 3xx methods
  expect(response.notModified).to.be.a('function');

  // 4xx methods
  expect(response.badRequest).to.be.a('function');
  expect(response.unauthorized).to.be.a('function');
  expect(response.paymentRequired).to.be.a('function');
  expect(response.forbidden).to.be.a('function');
  expect(response.notFound).to.be.a('function');
  expect(response.methodNotAllowed).to.be.a('function');
  expect(response.conflict).to.be.a('function');

  // 5xx methods
  expect(response.internalServerError).to.be.a('function');
  expect(response.notImplemented).to.be.a('function');
  expect(response.badGateway).to.be.a('function');
  expect(response.serviceUnavailable).to.be.a('function');

  // misc
  expect(response.error).to.be.a('function');
};

describe('2xx responses', () => {
  it('should be able to reply `ok`', (done) => {
    const data = faker.helpers.userCard();

    app.get('/', (request, response) => {
      assertRespond(request, response);
      response.ok(data);
    });

    supertest(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(response.body).to.eql(data);
        done(error, response);
      });
  });

  it('should be able to reply `created`', (done) => {
    const data = faker.helpers.userCard();

    app.post('/', (request, response) => {
      assertRespond(request, response);
      response.created(data);
    });

    supertest(app)
      .post('/')
      .set('Accept', 'application/json')
      .expect(201)
      .end((error, response) => {
        expect(response.body).to.eql(data);
        done(error, response);
      });
  });

  it('should be able to reply `accepted`', (done) => {
    app.get('/accepted', (request, response) => {
      assertRespond(request, response);
      response.accepted();
    });

    supertest(app)
      .get('/accepted')
      .set('Accept', 'application/json')
      .expect(202)
      .end(done);
  });

  it('should be able to reply `noContent`', (done) => {
    app.get('/nocontent', (request, response) => {
      assertRespond(request, response);
      response.noContent();
    });

    supertest(app)
      .get('/nocontent')
      .set('Accept', 'application/json')
      .expect(204)
      .end(done);
  });
});

describe('3xx responses', () => {
  it('should be able to reply `notModified`', (done) => {
    app.get('/notmodified', (request, response) => {
      assertRespond(request, response);
      response.notModified();
    });

    supertest(app)
      .get('/notmodified')
      .set('Accept', 'application/json')
      .expect(304)
      .end(done);
  });
});

describe('4xx responses', () => {
  it('should be able to reply `badRequest`', (done) => {
    const error = new Error('Bad Request');

    app.get('/badrequest', (request, response) => {
      assertRespond(request, response);
      response.badRequest(error);
    });

    supertest(app)
      .get('/badrequest')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error$1, response) => {
        expect(response.body.status).to.be.eql('400');
        expect(response.body.code).to.be.eql('400');
        expect(response.body.name).to.be.eql('Error');
        expect(response.body.message).to.be.eql('Bad Request');
        expect(response.body.description).to.be.eql('Bad Request');
        done(error$1, response);
      });
  });

  it('should be able to reply `unauthorized`', (done) => {
    app.get('/unauthorized', (request, response) => {
      assertRespond(request, response);
      response.unauthorized();
    });

    supertest(app)
      .get('/unauthorized')
      .set('Accept', 'application/json')
      .expect(401)
      .end(done);
  });

  it('should be able to reply `paymentRequired`', (done) => {
    app.get('/paymentRequired', (request, response) => {
      assertRespond(request, response);
      response.paymentRequired();
    });

    supertest(app)
      .get('/paymentRequired')
      .set('Accept', 'application/json')
      .expect(402)
      .end(done);
  });

  it('should be able to reply `forbidden`', (done) => {
    app.get('/forbidden', (request, response) => {
      assertRespond(request, response);
      response.forbidden();
    });

    supertest(app)
      .get('/forbidden')
      .set('Accept', 'application/json')
      .expect(403)
      .end(done);
  });

  it('should be able to reply `notFound`', (done) => {
    app.get('/notFound', (request, response) => {
      assertRespond(request, response);
      response.notFound();
    });

    supertest(app)
      .get('/notFound')
      .set('Accept', 'application/json')
      .expect(404)
      .end(done);
  });

  it('should be able to reply `methodNotAllowed`', (done) => {
    app.get('/methodNotAllowed', (request, response) => {
      assertRespond(request, response);
      response.methodNotAllowed();
    });

    supertest(app)
      .get('/methodNotAllowed')
      .set('Accept', 'application/json')
      .expect(405)
      .end(done);
  });

  it('should be able to reply `notAcceptable`', (done) => {
    app.get('/notAcceptable', (request, response) => {
      assertRespond(request, response);
      response.notAcceptable();
    });

    supertest(app)
      .get('/notAcceptable')
      .set('Accept', 'application/json')
      .expect(406)
      .end(done);
  });

  it('should be able to reply `conflict`', (done) => {
    app.get('/conflict', (request, response) => {
      assertRespond(request, response);
      response.conflict();
    });

    supertest(app)
      .get('/conflict')
      .set('Accept', 'application/json')
      .expect(409)
      .end(done);
  });
});

describe('5xx responses', () => {
  it('should be able to reply `internalServerError`', (done) => {
    app.get('/internalServerError', (request, response) => {
      assertRespond(request, response);
      response.internalServerError();
    });

    supertest(app)
      .get('/internalServerError')
      .set('Accept', 'application/json')
      .expect(500)
      .end(done);
  });

  it('should be able to reply `notImplemented`', (done) => {
    app.get('/notImplemented', (request, response) => {
      assertRespond(request, response);
      response.notImplemented();
    });

    supertest(app)
      .get('/notImplemented')
      .set('Accept', 'application/json')
      .expect(501)
      .end(done);
  });

  it('should be able to reply `badGateway`', (done) => {
    app.get('/badGateway', (request, response) => {
      assertRespond(request, response);
      response.badGateway();
    });

    supertest(app)
      .get('/badGateway')
      .set('Accept', 'application/json')
      .expect(502)
      .end(done);
  });

  it('should be able to reply `gatewayTimeout`', (done) => {
    app.get('/gatewayTimeout', (request, response) => {
      assertRespond(request, response);
      response.gatewayTimeout();
    });

    supertest(app)
      .get('/gatewayTimeout')
      .set('Accept', 'application/json')
      .expect(504)
      .end(done);
  });

  it('should be able to reply `serviceUnavailable`', (done) => {
    app.get('/serviceUnavailable', (request, response) => {
      assertRespond(request, response);
      response.serviceUnavailable();
    });

    supertest(app)
      .get('/serviceUnavailable')
      .set('Accept', 'application/json')
      .expect(503)
      .end(done);
  });
});

describe('error responses', () => {
  it('should be able to reply `error`', (done) => {
    app.get('/error', (request, response) => {
      assertRespond(request, response);
      response.error(new Error('Internal Error'));
    });

    supertest(app)
      .get('/error')
      .set('Accept', 'application/json')
      .expect(500)
      .end((error, response) => {
        const { body } = response;
        expect(body.code).to.exist.and.be.equal(500);
        expect(body.status).to.exist.and.be.equal(500);
        expect(body.name).to.exist;
        expect(body.message).to.exist.and.be.equal('Internal Error');
        expect(body.description).to.exist;
        expect(body.stack).to.exist;
        done();
      });
  });

  it('should be able to reply `error`', (done) => {
    app.get('/error-custom', (request, response) => {
      assertRespond(request, response);
      const error = new Error('Invalid Arguments');
      error.status = 400;
      response.error(error);
    });

    supertest(app)
      .get('/error-custom')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error, response) => {
        const { body } = response;
        expect(body.code).to.exist.and.be.equal(400);
        expect(body.status).to.exist.and.be.equal(400);
        expect(body.name).to.exist;
        expect(body.message).to.exist.and.be.equal('Invalid Arguments');
        expect(body.description).to.exist;
        expect(body.stack).to.exist;
        done();
      });
  });
});
