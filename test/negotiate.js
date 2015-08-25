'use strict';

//dependencies
var path = require('path');
var faker = require('faker');
var expect = require('chai').expect;
var Request = require('mock-express-request');
var Response = require('mock-express-response');

describe('response content negotiation', function() {

    it('should be able to negotiate with default response type', function(done) {

        var data = faker.helpers.contextualCard();

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {
                expect(response._getJSON().name).to.equal(data.name);
                done();
            }
        });

        var negotiate = require(path.join(__dirname, '..', 'lib', 'negotiate'));

        var respond = require(path.join(__dirname, '..'))();

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
});