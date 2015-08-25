'use strict';

//dependencies
var _ = require('lodash');

/**
 * @function
 * @description respond with 3xx redirection response
 * 
 * @example
 * return res.notModified();
 * return res.notModified(data);
 * return res.notModified('auth/login',data);
 * return res.notModified('auth/login',data,fn);
 *
 * @param {String} [view] name of the view to render
 * @param {Object} [data] response data or data to render in the view
 * @param {Function} [callback] a callback function,  If provided, the method 
 *                              returns both the possible error and rendered string, 
 *                              but does not perform an automated response.
 * @private
 */
function redirection(view, data, callback) {
    /*jshint validthis:true*/

    //harmonize response args

    //only data passed
    if (_.size(arguments) === 1) {
        data = view;
        view = undefined;
        callback = undefined;
    }

    //reference current request and its response
    var response = this;
    var request = this.req;

    //negotiate response type
    var negotiated = request._respond.negotiate(request, response);

    //try to respond with view
    if (view) {
        return negotiated(view, data, callback);
    }
    //respond with data
    else {
        return negotiated(data);
    }

}


/**
 * @function
 * @description extend response with common 3xx responses
 * @param  {HttpResponse} response valid expressjs http response
 * @public
 */
module.exports = function(response) {
    var _3xxStatusCodes = [{
        code: 304,
        status: 'Not Modified'
    }];

    //attach response methods
    _.forEach(_3xxStatusCodes, function(statusCode) {

        var method = _.camelCase(statusCode.status);
        var code = statusCode.code;

        //extend http response with the custom response type methods
        response[method] = function() {
            response.status(code);
            return redirection.apply(response, arguments);
        };
    });
};