'use strict';

//dependencies
var _ = require('lodash');

/**
 * @function
 * @description respond with 4xx client error response
 * 
 * @example
 * return res.badRequest();
 * return res.badRequest(error);
 * return res.badRequest('auth/login',error);
 * return res.badRequest('auth/login',error,fn);
 *
 * @param {String} [view] name of the view to render
 * @param {Object} [error] response error occurred or error to render in the view
 * @param {Function} [callback] a callback function,  If provided, the method 
 *                              returns both the possible error and rendered string, 
 *                              but does not perform an automated response.
 * @private
 */
function _clientError(view, error, callback) {
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
    //and prevent error.stact leaking
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
    error = _.merge(error, {
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
    var _4xxStatusCodes = [{
        code: 400,
        status: 'Bad Request'
    }, {
        code: 401,
        status: 'Unauthorized'
    }, {
        code: 402,
        status: 'Payment Required'
    }, {
        code: 403,
        status: 'Forbidden'
    }, {
        code: 404,
        status: 'Not Found'
    }, {
        code: 405,
        status: 'Method Not Allowed'
    }, {
        code: 406,
        status: 'Not Acceptable'
    }, {
        code: 409,
        status: 'Conflict'
    }];

    //attach response methods
    _.forEach(_4xxStatusCodes, function(statusCode) {

        var method = _.camelCase(statusCode.status);
        var code = statusCode.code;

        //extend http response with the custom response type methods
        response[method] = function() {
            response.status(code);
            return _clientError.apply(response, arguments);
        };
    });
};