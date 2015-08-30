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
        },
        xml: function xml() {
            response.type('xml');
            return response.send.apply(response, arguments);
        }
    };

    //check for jsonp callback
    var app = response.app;
    var jsonpCallbackName =
        app && app.get ? app.get('jsonp callback name') : app['jsonp callback name'];

    //obtain callback only if request.query is available
    var callback = request.query ? request.query[jsonpCallbackName] : undefined;

    //deduce best match accepted content type for response
    var acceptedType =
        request.accepts(request._respond.types) || request._respond.defaultType;

    //if accepted type is json and there is jsonp callback param
    //provided make use of jsonp
    if (callback && acceptedType === 'json') {
        acceptedType = 'jsonp';
    }

    //return a function to be invoked for response
    return accepted[acceptedType];
};