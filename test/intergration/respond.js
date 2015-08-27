'use strict';

//dependencies
var faker = require('faker');
var request = require('supertest');
var path = require('path');
var expect = require('chai').expect;
var respond = require(path.join(__dirname, '..', '..'));
var app = require('express')();
app.use(respond());

//assert respond
function assertRespond(request, response) {
    //request._respond must exists
    expect(request._respond).to.exist;

    //2xx methods
    expect(response.ok).to.be.a('function');
    expect(response.created).to.be.a('function');
    expect(response.accepted).to.be.a('function');
    expect(response.noContent).to.be.a('function');

    //3xx methods
    expect(response.notModified).to.be.a('function');

    //4xx methods
    expect(response.badRequest).to.be.a('function');
    expect(response.unauthorized).to.be.a('function');
    expect(response.paymentRequired).to.be.a('function');
    expect(response.forbidden).to.be.a('function');
    expect(response.notFound).to.be.a('function');
    expect(response.methodNotAllowed).to.be.a('function');
    expect(response.conflict).to.be.a('function');

    //5xx methods
    expect(response.internalServerError).to.be.a('function');
    expect(response.notImplemented).to.be.a('function');
    expect(response.badGateway).to.be.a('function');
    expect(response.serviceUnavailable).to.be.a('function');
}


describe('respond express integration', function() {

    describe('2xx responses', function() {
        it('should be able to respond using `ok`', function(done) {
            var data = faker.helpers.contextualCard();
            delete data.dob;

            app.get('/', function(request, response) {

                assertRespond(request, response);

                response.ok(data);

            });

            request(app)
                .get('/')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(error, response) {

                    expect(response.body).to.eql(data);

                    done(error, response);
                });
        });

        it('should be able to respond using `created`', function(done) {
            var data = faker.helpers.contextualCard();
            delete data.dob;

            app.post('/', function(request, response) {

                assertRespond(request, response);

                response.created(data);

            });

            request(app)
                .post('/')
                .set('Accept', 'application/json')
                .expect(201)
                .end(function(error, response) {

                    expect(response.body).to.eql(data);

                    done(error, response);
                });
        });

        it('should be able to respond using `accepted`', function(done) {

            app.get('/accepted', function(request, response) {

                assertRespond(request, response);

                response.accepted();

            });

            request(app)
                .get('/accepted')
                .set('Accept', 'application/json')
                .expect(202)
                .end(done);
        });

        it('should be able to respond using `noContent`', function(done) {

            app.get('/nocontent', function(request, response) {

                assertRespond(request, response);

                response.noContent();

            });

            request(app)
                .get('/nocontent')
                .set('Accept', 'application/json')
                .expect(204)
                .end(done);
        });
    });


    describe('3xx responses', function() {
        it('should be able to respond using `notModified`', function(done) {

            app.get('/notmodified', function(request, response) {

                assertRespond(request, response);

                response.notModified();

            });

            request(app)
                .get('/notmodified')
                .set('Accept', 'application/json')
                .expect(304)
                .end(done);
        });
    });

    describe('4xx responses', function() {

        it('should be able to respond using `badRequest`', function(done) {

            app.get('/badrequest', function(request, response) {

                assertRespond(request, response);

                response.badRequest();

            });

            request(app)
                .get('/badrequest')
                .set('Accept', 'application/json')
                .expect(400)
                .end(done);
        });


        it('should be able to respond using `unauthorized`', function(done) {

            app.get('/unauthorized', function(request, response) {

                assertRespond(request, response);

                response.unauthorized();

            });

            request(app)
                .get('/unauthorized')
                .set('Accept', 'application/json')
                .expect(401)
                .end(done);
        });


        it('should be able to respond using `paymentRequired`', function(done) {

            app.get('/paymentRequired', function(request, response) {

                assertRespond(request, response);

                response.paymentRequired();

            });

            request(app)
                .get('/paymentRequired')
                .set('Accept', 'application/json')
                .expect(402)
                .end(done);
        });



        it('should be able to respond using `forbidden`', function(done) {

            app.get('/forbidden', function(request, response) {

                assertRespond(request, response);

                response.forbidden();

            });

            request(app)
                .get('/forbidden')
                .set('Accept', 'application/json')
                .expect(403)
                .end(done);
        });


        it('should be able to respond using `notFound`', function(done) {

            app.get('/notFound', function(request, response) {

                assertRespond(request, response);

                response.notFound();

            });

            request(app)
                .get('/notFound')
                .set('Accept', 'application/json')
                .expect(404)
                .end(done);
        });


        it('should be able to respond using `methodNotAllowed`', function(done) {

            app.get('/methodNotAllowed', function(request, response) {

                assertRespond(request, response);

                response.methodNotAllowed();

            });

            request(app)
                .get('/methodNotAllowed')
                .set('Accept', 'application/json')
                .expect(405)
                .end(done);
        });

        it('should be able to respond using `notAcceptable`', function(done) {

            app.get('/notAcceptable', function(request, response) {

                assertRespond(request, response);

                response.notAcceptable();

            });

            request(app)
                .get('/notAcceptable')
                .set('Accept', 'application/json')
                .expect(406)
                .end(done);
        });

        it('should be able to respond using `conflict`', function(done) {

            app.get('/conflict', function(request, response) {

                assertRespond(request, response);

                response.conflict();

            });

            request(app)
                .get('/conflict')
                .set('Accept', 'application/json')
                .expect(409)
                .end(done);
        });


    });


    describe('5xx responses', function() {

        it('should be able to respond using `internalServerError`', function(done) {

            app.get('/internalServerError', function(request, response) {

                assertRespond(request, response);

                response.internalServerError();

            });

            request(app)
                .get('/internalServerError')
                .set('Accept', 'application/json')
                .expect(500)
                .end(done);
        });

        it('should be able to respond using `notImplemented`', function(done) {

            app.get('/notImplemented', function(request, response) {

                assertRespond(request, response);

                response.notImplemented();

            });

            request(app)
                .get('/notImplemented')
                .set('Accept', 'application/json')
                .expect(501)
                .end(done);
        });


        it('should be able to respond using `badGateway`', function(done) {

            app.get('/badGateway', function(request, response) {

                assertRespond(request, response);

                response.badGateway();

            });

            request(app)
                .get('/badGateway')
                .set('Accept', 'application/json')
                .expect(502)
                .end(done);
        });

        it('should be able to respond using `serviceUnavailable`', function(done) {

            app.get('/serviceUnavailable', function(request, response) {

                assertRespond(request, response);

                response.serviceUnavailable();

            });

            request(app)
                .get('/serviceUnavailable')
                .set('Accept', 'application/json')
                .expect(503)
                .end(done);
        });

    });

});