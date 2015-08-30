'use strict';

//dependencies
var path = require('path');
var faker = require('faker');
var expect = require('chai').expect;
var Request = require('mock-express-request');
var Response = require('mock-express-response');
var normalize = require(path.join(__dirname, '..', '..', 'lib', 'normalize'));

describe('normalize', function() {

    it('should be a function', function(done) {
        expect(normalize).to.be.a('function');
        done();
    });

    it('should be able to normalize params with data only', function(done) {
        var data = faker.helpers.contextualCard();

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {}
        });

        var args = normalize.call(response, data);

        expect(args.data).to.exist;
        expect(args.view).to.not.exist;
        expect(args.callback).to.not.exist;

        done();
    });

    it('should be able to normalize params with view and data only', function(done) {
        var data = faker.helpers.contextualCard();

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {}
        });

        var args = normalize.call(response, 'home.html', data);

        expect(args.data).to.exist;
        expect(args.view).to.exist;
        expect(args.callback).to.not.exist;

        done();
    });

    it('should be able to normalize params with view, data and callback only', function(done) {
        var data = faker.helpers.contextualCard();

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {}
        });

        var args = normalize.call(response, 'home.html', data, function() {});

        expect(args.data).to.exist;
        expect(args.view).to.exist;
        expect(args.callback).to.exist;

        done();
    });

    it('should be able to normalize params with view, error and callback only', function(done) {
        var error = new Error(faker.name.firstName());

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            }
        });

        var response = new Response({
            request: request,
            finish: function() {}
        });

        var args = normalize.call(response, 'home.html', error, function() {});

        expect(args.error).to.exist;
        expect(args.data).to.not.exist;
        expect(args.view).to.exist;
        expect(args.callback).to.exist;

        done();
    });
});