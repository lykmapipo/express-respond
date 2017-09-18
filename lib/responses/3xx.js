'use strict';

//dependencies
const path = require('path');
const _ = require('lodash');
const normalize = require(path.join(__dirname, '..', 'normalize'));

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
    const args = normalize.call(this, view, data, callback);

    //reference current request and its response
    const response = this;
    const request = this.req;

    //negotiate response type
    const negotiated = request._respond.negotiate(request, response);

    //try to respond with view
    if (args.view && negotiated.name === 'html') {
        return negotiated(args.view, args.data, args.callback);
    }

    //respond with data
    else {
        return negotiated(args.data);
    }

}


/**
 * @function
 * @description extend response with common 3xx responses
 * @param  {HttpResponse} response valid expressjs http response
 * @public
 */
module.exports = function(response) {
    const _3xxStatusCodes = [{
        code: 304,
        status: 'Not Modified'
    }];

    //attach response methods
    _.forEach(_3xxStatusCodes, function(statusCode) {

        const method = _.camelCase(statusCode.status);
        const code = statusCode.code;

        //extend http response with the custom response type methods
        response[method] = response[code] = function() {
            response.status(code);
            return redirection.apply(response, arguments);
        };
    });
};