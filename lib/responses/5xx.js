'use strict';

//dependencies
var path = require('path');
var _ = require('lodash');
var normalize = require(path.join(__dirname, '..', 'normalize'));

/**
 * @function
 * @description respond with 5xx server error response
 * 
 * @example
 * return res.internalServerError();
 * return res.internalServerError(error);
 * return res.internalServerError('auth/login',error);
 * return res.internalServerError('auth/login',error,fn);
 *
 * @param {String} [view] name of the view to render
 * @param {Object} [error] response error occurred or error to render in the view
 * @param {Function} [callback] a callback function,  If provided, the method 
 *                              returns both the possible error and rendered string, 
 *                              but does not perform an automated response.
 * @private
 */
function serverError(view, error, callback) {
    /*jshint validthis:true*/

    //harmonize response args
    var args = normalize.call(this, view, error, callback);

    //make sure error object exists
    if (_.isUndefined(args.error)) {
        args.error = {};
    }
    //reference current request and its response
    var response = this;
    var request = this.req;

    //negotiate response type
    var negotiated = request._respond.negotiate(request, response);

    //respond with error message in production
    //and prevent error.stact leaking
    if (request._respond.environment === 'production') {
        //see http://www.restapitutorial.com/resources.html
        if (_.isError(args.error)) {
            args.error = {
                code: response.statusCode,
                status: 'fail',
                message: args.error.message,
                data: args.error.name
            };
        }
    }

    //always extend error object with status code and status
    else {
        args.error = _.merge(args.error, {
            code: response.statusCode,
            status: 'fail',
            data: args.error.name || args.error.message
        });
    }

    //try to respond with view
    if (args.view && negotiated.name === 'html') {
        return negotiated(args.view, args.error, args.callback);
    }

    //respond with data
    else {
        return negotiated(args.error);
    }

}


/**
 * @function
 * @description extend response with common 5xx responses
 * @param  {HttpResponse} response valid expressjs http response
 * @public
 */
module.exports = function(response) {
    var _5xxStatusCodes = [{
        code: 500,
        status: 'Internal Server Error'
    }, {
        code: 501,
        status: 'Not Implemented'
    }, {
        code: 502,
        status: 'Bad Gateway'
    }, {
        code: 503,
        status: 'Service Unavailable'
    }];

    //attach response methods
    _.forEach(_5xxStatusCodes, function(statusCode) {

        var method = _.camelCase(statusCode.status);
        var code = statusCode.code;

        //extend http response with the custom response type methods
        response[method] = response[code] = function() {
            response.status(code);
            return serverError.apply(response, arguments);
        };
    });
};