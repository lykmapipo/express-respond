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
});