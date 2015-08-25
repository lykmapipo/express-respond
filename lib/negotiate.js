'use strict';

/**
 * @function
 * @description return probable content type
 * @param  {HttpRequest} request  valid http request
 * @param  {HttpResponse} response valid http response
 * @return {Function} a function to respond with correct response content type
 * @public
 */
module.exports = function(request, response) {
    var accepted = {
        json: function json() {
            // body...
        },
        jsonp: function jsonp() {
            // body...
        },
        html: function html() {
            // body...
        },
        text: function text() {
            // body...
        }
    };

    //decuce accepted content type for response
    var acceptedType =
        request.accepts(request._respond) || request._respond.defaultType;

    //return a function to be invoked for response
    return accepted[acceptedType];
};