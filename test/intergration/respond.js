'use strict';

//dependencies
var faker = require('faker');
var request = require('supertest');
var path = require('path');
var expect = require('chai').expect;
var respond = require(path.join(__dirname, '..', '..'));
var app = require('express')();
app.use(respond());



describe('respond express integration', function() {

    it('should be able to respond using `ok`', function(done) {
        var data = faker.helpers.contextualCard();
        delete data.dob;

        app.get('/', function(request, response) {

            expect(request._respond).to.exist;

            response.ok(data);

        });

        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(error, response) {

                expect(response.body).to.eql(data);

                done(error, response);
            });
    });

});