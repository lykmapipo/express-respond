'use strict';

//dependencies

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
            return response.json.apply(response, arguments);
        },
        jsonp: function jsonp() {
            response.type('json');
            return response.jsonp.apply(response, arguments);
        },
        html: function html() {
            response.type('html');
            return response.render.apply(response, arguments);
        },
        text: function text() {
            response.type('text');
            return response.send.apply(response, arguments);
        }
    };

    //decuce accepted content type for response
    var acceptedType =
        request.accepts(request._respond.types) || request._respond.defaultType;

    //return a function to be invoked for response
    return accepted[acceptedType];
};