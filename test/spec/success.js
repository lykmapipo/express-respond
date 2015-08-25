'use strict';

//dependencies
var path = require('path');
var expect = require('chai').expect;
var Request = require('mock-express-request');
var Response = require('mock-express-response');

describe('respond success', function() {

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
            expect(response.noContent).to.be.a('function');

            done();
        });
    });
});