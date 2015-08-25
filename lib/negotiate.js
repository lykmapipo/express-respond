'use strict';

//dependencies
var _ = require('lodash');

/**
 * @function
 * @description return probable content type
 * @param  {HttpRequest} request  valid http request
 * @param  {HttpResponse} response valid http response
 * @return {Function} a function to respond with correct response content type
 * @public
 */
module.exports = function(request, response) {
    //map for accepted type and their responder
    var accepted = {
        json: function json() {
            response.type('json');
            return response.json.call(response, _.first(arguments));
        },
        jsonp: function jsonp() {
            response.type('json');
            return response.jsonp.call(response, _.first(arguments));
        },
        html: function html() {
            response.type('html');
            return response.render.call(response, arguments);
        },
        text: function text() {
            response.type('text');
            return response.send.call(response, _.first(arguments));
        }
    };

    //decuce accepted content type for response
    var acceptedType =
        request.accepts(request._respond.types) || request._respond.defaultType;

    //return a function to be invoked for response
    return accepted[acceptedType];
};