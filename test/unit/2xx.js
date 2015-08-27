'use strict';

//dependencies
var path = require('path');
var ejs = require('ejs');
var faker = require('faker');
var expect = require('chai').expect;
var Request = require('mock-express-request');
var Response = require('mock-express-response');

describe('respond 2xx', function() {

    it('should have common 2xx response methods', function(done) {
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

            expect(response.ok).to.be.a('function');
            expect(response.created).to.be.a('function');
            expect(response.accepted).to.be.a('function');
            expect(response.noContent).to.be.a('function');

            done();
        });
    });

    it('should be able to response with 201 `created`', function(done) {

        var data = faker.helpers.contextualCard();

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.statusCode).to.be.equal(201);

                expect(response.statusMessage).to.be.equal('Created');

                expect(response.get('content-type'))
                    .to.be.equal('application/json; charset=utf-8');

                expect(response._getJSON().name).to.equal(data.name);

                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {
            //invoke created
            response.created(data);

        });

    });

    it('should be able to response with 200 `ok`', function(done) {

        var data = faker.helpers.contextualCard();

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.statusCode).to.be.equal(200);

                expect(response.statusMessage).to.be.equal('OK');

                expect(response.get('content-type'))
                    .to.be.equal('application/json; charset=utf-8');

                expect(response._getJSON().name).to.equal(data.name);

                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {
            //invoke created
            response.ok(data);

        });

    });

    it('should be able to response with 200 `ok` html', function(done) {

        var request = new Request({
            headers: {
                'Accept': 'text/html'
            }
        });

        var response = new Response({
            request: request,
            render: ejs.renderFile,
            finish: function() {

                expect(response.statusCode).to.be.equal(200);

                expect(response.statusMessage).to.be.equal('OK');

                expect(response.get('content-type'))
                    .to.be.equal('text/html; charset=utf-8');

                expect(response._getString()).to.be.equal('<p>Hello Mock</p>');


                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {
            //invoke created
            response.ok(path.join(__dirname, 'template.ejs'), {
                name: 'Mock'
            });

        });

    });

    it('should be able to response with 204 `No Content`', function(done) {

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.statusCode).to.be.equal(204);

                expect(response.statusMessage).to.be.equal('No Content');

                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {
            //invoke created
            response.noContent();

        });

    });
});