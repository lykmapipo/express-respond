'use strict';

//dependencies
var _ = require('lodash');

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
function _error(view, error, callback) {
    /*jshint validthis:true*/

    //harmonize response args

    //only error passed
    if (_.size(arguments) === 1) {
        error = view;
        view = undefined;
        callback = undefined;
    }

    //reference current request and its response
    var response = this;
    var request = this.req;

    //negotiate response type
    var negotiated = request._respond.negotiate(request, response);

    //respond with error message in production
    if (request._respond.environment === 'production') {
        //see http://www.restapitutorial.com/resources.html
        if (_.isError(error)) {
            error = {
                code: response.statusCode,
                status: 'fail',
                message: error.message,
                data: error.name
            };
        }
    }

    //always extend plain error object with status code and status
    error = _.merge(error, error = {
        code: response.statusCode,
        status: 'fail',
        data: error.name || error.message
    });

    //try to respond with view
    if (view) {
        return negotiated(view, error, callback);
    }
    //respond with error
    else {
        return negotiated(error);
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
        response[method] = function() {
            response.status(code);
            return _error.apply(response, arguments);
        };
    });
};