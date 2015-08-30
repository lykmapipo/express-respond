'use strict';

//dependencies
var path = require('path');
var ejs = require('ejs');
var expect = require('chai').expect;
var Request = require('mock-express-request');
var Response = require('mock-express-response');

describe('respond 3xx', function() {

    it('should have common 3xx response methods', function(done) {
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

            expect(response.notModified).to.be.a('function');

            done();
        });
    });

    it('should be able to response with 304 `not modified`', function(done) {

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.statusCode).to.be.equal(304);

                expect(response.statusMessage).to.be.equal('Not Modified');

                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {
            //invoke notModified
            response.notModified();

        });

    });


    it('should be able to response with 304 `not modified` html', function(done) {

        var request = new Request({
            headers: {
                'Accept': 'text/html'
            }
        });

        var response = new Response({
            request: request,
            render: ejs.renderFile,
            finish: function() {
                expect(response.statusCode).to.be.equal(304);

                expect(response.statusMessage).to.be.equal('Not Modified');

                done();
            }
        });

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {
            //invoke notModified
            response.notModified(path.join(__dirname, 'template.ejs'), {
                name: 'Mock'
            });

        });

    });

});