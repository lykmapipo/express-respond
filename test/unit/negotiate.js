'use strict';

//dependencies
var path = require('path');
var ejs = require('ejs');
var faker = require('faker');
var expect = require('chai').expect;
var Request = require('mock-express-request');
var Response = require('mock-express-response');

describe('response content negotiation', function() {

    it('should be able to negotiate with json response type', function(done) {

        var data = faker.helpers.contextualCard();

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.get('content-type'))
                    .to.be.equal('application/json; charset=utf-8');

                expect(response._getJSON().name).to.equal(data.name);
                done();
            }
        });

        var negotiate = require(path.join(__dirname, '..', '..', 'lib', 'negotiate'));

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {

            var negotiated = negotiate(request, response);

            expect(negotiated).to.be.a('function');

            expect(request._respond.defaultType).to.equal('json');
            expect(request._respond.environment).to.equal('development');
            expect(request._respond.types).to.eql(['json', 'html', 'text']);

            //invoke negotiated
            negotiated(data);

        });

    });

    it('should be able to negotiate with html response type', function(done) {

        var request = new Request({
            headers: {
                'Accept': 'text/html'
            }
        });

        var response = new Response({
            render: ejs.renderFile,
            request: request,
            finish: function() {

                expect(response.get('content-type'))
                    .to.be.equal('text/html; charset=utf-8');

                expect(response._getString()).to.be.equal('<p>Hello Mock</p>');

                done();
            }
        });

        var negotiate = require(path.join(__dirname, '..', '..', 'lib', 'negotiate'));

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {

            var negotiated = negotiate(request, response);

            expect(negotiated).to.be.a('function');

            expect(request._respond.defaultType).to.equal('json');
            expect(request._respond.environment).to.equal('development');
            expect(request._respond.types).to.eql(['json', 'html', 'text']);

            //invoke negotiated
            negotiated(path.join(__dirname, 'template.ejs'), {
                name: 'Mock'
            });

        });

    });

    it('should be able to negotiate with text response type', function(done) {

        var request = new Request({
            headers: {
                'Accept': 'text/plain'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.get('content-type'))
                    .to.be.equal('text/plain; charset=utf-8');

                expect(response._getString()).to.be.equal('Hello');

                done();
            }
        });

        var negotiate = require(path.join(__dirname, '..', '..', 'lib', 'negotiate'));

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {

            var negotiated = negotiate(request, response);

            expect(negotiated).to.be.a('function');

            expect(request._respond.defaultType).to.equal('json');
            expect(request._respond.environment).to.equal('development');
            expect(request._respond.types).to.eql(['json', 'html', 'text']);

            //invoke negotiated
            negotiated('Hello');

        });

    });

    /*jshint unused:false*/
    /*jslint evil: true */
    it('should be able to negotiate with jsonp response type', function(done) {

        var data = faker.helpers.contextualCard();

        //jsonp callback
        function callback(_data) {
            expect(_data.name).to.be.equal(data.name);
        }

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            },
            query: {
                callback: 'callback'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {
                //execute jsonp callback
                eval(response._getString());

                expect(response.get('content-type'))
                    .to.be.equal('text/javascript; charset=utf-8');

                done();
            }
        });

        var negotiate = require(path.join(__dirname, '..', '..', 'lib', 'negotiate'));

        var respond = require(path.join(__dirname, '..', '..'))();

        respond(request, response, function() {

            var negotiated = negotiate(request, response);

            expect(negotiated).to.be.a('function');

            expect(request._respond.defaultType).to.equal('json');
            expect(request._respond.environment).to.equal('development');
            expect(request._respond.types).to.eql(['json', 'html', 'text']);

            //invoke negotiated
            negotiated(data);

        });

    });
    /*jshint unused:true*/
    /*jslint evil: false */

    it('should be able to negotiate with xml response type', function(done) {

        var name = faker.internet.userName();

        var request = new Request({
            headers: {
                'Accept': 'application/xml'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {

                expect(response.get('content-type'))
                    .to.be.equal('application/xml; charset=utf-8');

                expect(response._getString()).to.be.equal('<name>' + name + '</name>');

                done();
            }
        });

        var negotiate = require(path.join(__dirname, '..', '..', 'lib', 'negotiate'));

        var respond = require(path.join(__dirname, '..', '..'))({
            types: ['xml', 'json']
        });

        respond(request, response, function() {

            var negotiated = negotiate(request, response);

            expect(negotiated).to.be.a('function');

            expect(request._respond.defaultType).to.equal('json');
            expect(request._respond.environment).to.equal('development');
            expect(request._respond.types).to.eql(['xml', 'json']);

            //invoke negotiated
            negotiated('<name>' + name + '</name>');

        });

    });

});