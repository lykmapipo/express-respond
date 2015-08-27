'use strict';

//dependencies
var path = require('path');
var expect = require('chai').expect;
var Request = require('mock-express-request');
var Response = require('mock-express-response');

describe('respond 4xx', function() {

    it('should have common 4xx response methods', function(done) {
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

            expect(response.badRequest).to.be.a('function');
            expect(response.unauthorized).to.be.a('function');
            expect(response.paymentRequired).to.be.a('function');
            expect(response.forbidden).to.be.a('function');
            expect(response.notFound).to.be.a('function');
            expect(response.methodNotAllowed).to.be.a('function');
            expect(response.conflict).to.be.a('function');

            done();
        });
    });

    it('should be able to response with 400 `bad request`', function(done) {

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.statusCode).to.be.equal(400);

                expect(response.statusMessage).to.be.equal('Bad Request');

                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {
            //invoke badRequest
            response.badRequest();

        });

    });

    it('should be able to response with 401 `unauthorized`', function(done) {

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.statusCode).to.be.equal(401);

                expect(response.statusMessage).to.be.equal('Unauthorized');

                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {
            //invoke unauthorized
            response.unauthorized(new Error('Invalid credentials'));

        });

    });

    it('should be able to response with 402 `payment required`', function(done) {

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.statusCode).to.be.equal(402);

                expect(response.statusMessage).to.be.equal('Payment Required');

                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {
            //invoke paymentRequired
            response.paymentRequired();
        });

    });

    it('should be able to response with 403 `forbidden`', function(done) {

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.statusCode).to.be.equal(403);

                expect(response.statusMessage).to.be.equal('Forbidden');

                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {
            //invoke forbidden
            response.forbidden();

        });

    });

    it('should be able to response with 404 `not found`', function(done) {

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.statusCode).to.be.equal(404);

                expect(response.statusMessage).to.be.equal('Not Found');

                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {
            //invoke notFound
            response.notFound();

        });

    });

    it('should be able to response with 405 `method not allowed`', function(done) {

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.statusCode).to.be.equal(405);

                expect(response.statusMessage).to.be.equal('Method Not Allowed');

                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {
            //invoke methodNotAllowed
            response.methodNotAllowed();

        });

    });


    it('should be able to response with 406 `not acceptable`', function(done) {

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.statusCode).to.be.equal(406);

                expect(response.statusMessage).to.be.equal('Not Acceptable');

                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {
            //invoke notAcceptable
            response.notAcceptable();

        });

    });


    it('should be able to response with 409 `conflict`', function(done) {

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.statusCode).to.be.equal(409);

                expect(response.statusMessage).to.be.equal('Conflict');

                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {
            //invoke conflict
            response.conflict();

        });

    });

});