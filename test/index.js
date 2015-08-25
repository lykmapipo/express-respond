'use strict';

//dependencies
var path = require('path');
var expect = require('chai').expect;
var Request = require('mock-express-request');
var Response = require('mock-express-response');

describe('Express Respond', function() {

    it('should be able to set default respond options', function(done) {
        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {}
        });

        var respond = require(path.join(__dirname, '..'))();

        respond(request, response, function() {

            expect(request._respond.defaultType).to.equal('json');
            expect(request._respond.environment).to.equal('development');
            expect(request._respond.types).to.eql(['json', 'html', 'text']);

            done();
        });
    });

    it('should be able to set provided respond options', function(done) {
        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {}
        });

        var respond = require(path.join(__dirname, '..'))({
            defaultType: 'html',
            environment: 'production',
            types: ['json', 'html']
        });

        respond(request, response, function() {

            expect(request._respond.defaultType).to.equal('html');
            expect(request._respond.environment).to.equal('production');
            expect(request._respond.types).to.eql(['json', 'html']);

            done();
        });
    });
});