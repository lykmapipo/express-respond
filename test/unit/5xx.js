'use strict';

//dependencies
var path = require('path');
var ejs = require('ejs');
var expect = require('chai').expect;
var Request = require('mock-express-request');
var Response = require('mock-express-response');

describe('respond 5xx', function() {

    it('should have common 5xx response methods', function(done) {
        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {}
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {

            expect(response.internalServerError).to.be.a('function');
            expect(response.notImplemented).to.be.a('function');
            expect(response.badGateway).to.be.a('function');
            expect(response.serviceUnavailable).to.be.a('function');

            done();
        });
    });

    it('should be able to response with 500 `intenal server error`', function(done) {

        var error = new Error('Internal Server Error');

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.statusCode).to.be.equal(500);

                expect(response.statusMessage).to.be.equal('Internal Server Error');

                expect(response.get('content-type'))
                    .to.be.equal('application/json; charset=utf-8');

                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {
            //invoke internalServerError
            response.internalServerError(error);

        });

    });

    it('should be able to response with 501 `not implemented error`', function(done) {

        var error = new Error('Not Implemented');

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.statusCode).to.be.equal(501);

                expect(response.statusMessage).to.be.equal('Not Implemented');

                expect(response.get('content-type'))
                    .to.be.equal('application/json; charset=utf-8');

                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {
            //invoke notImplemented
            response.notImplemented(error);

        });

    });

    it('should be able to response with 502 `bad gateway error`', function(done) {

        var error = new Error('Bad Gateway');

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.statusCode).to.be.equal(502);

                expect(response.statusMessage).to.be.equal('Bad Gateway');

                expect(response.get('content-type'))
                    .to.be.equal('application/json; charset=utf-8');

                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {
            //invoke badGateway
            response.badGateway(error);

        });

    });

    it('should be able to response with 503 `service unavailable error`', function(done) {

        var error = new Error('Service Unavailable');

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.statusCode).to.be.equal(503);

                expect(response.statusMessage).to.be.equal('Service Unavailable');

                expect(response.get('content-type'))
                    .to.be.equal('application/json; charset=utf-8');

                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {
            //invoke serviceUnavailable
            response.serviceUnavailable(error);

        });

    });

    it('should be able to negotiate json response type even if `view` is provided', function(done) {

        var error = new Error('Not Found');

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            render: ejs.renderFile,
            request: request,
            finish: function() {

                expect(response.get('content-type'))
                    .to.be.equal('application/json; charset=utf-8');

                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {

            expect(request._respond.defaultType).to.equal('json');
            expect(request._respond.environment).to.equal('development');
            expect(request._respond.types).to.eql(['json', 'html', 'text']);

            //invoke internalServerError
            response.internalServerError(path.join(__dirname, 'template.ejs'), error);

        });

    });
});