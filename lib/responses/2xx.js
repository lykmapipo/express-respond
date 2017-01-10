'use strict';

//dependencies
var path = require('path');
var _ = require('lodash');
var normalize = require(path.join(__dirname, '..', 'normalize'));

/**
 * @function
 * @description respond with 2xx success response
 * 
 * @example
 * return res.ok();
 * return res.ok(data);
 * return res.ok('auth/login',data);
 * return res.ok('auth/login',data,fn);
 *
 * @param {String} [view] name of the view to render
 * @param {Object} [data] response data or data to render in the view
 * @param {Function} [callback] a callback function,  If provided, the method 
 *                              returns both the possible error and rendered string, 
 *                              but does not perform an automated response.
 * @private
 */
function success(view, data, callback) {
    /*jshint validthis:true*/

    //harmonize response args
    var args = normalize.call(this, view, data, callback);

    //reference current request and its response
    var response = this;
    var request = this.req;

    //negotiate response type
    var negotiated = request._respond.negotiate(request, response);

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
 * @description extend response with common 2xx responses
 * @param  {HttpResponse} response valid expressjs http response
 * @public
 */
module.exports = function(response) {
    var _2xxStatusCodes = [{
        code: 200,
        status: 'OK'
    }, {
        code: 201,
        status: 'Created'
    }, {
        code: 202,
        status: 'Accepted'
    }, {
        code: 204,
        status: 'No Content'
    }];

    //attach response methods
    _.forEach(_2xxStatusCodes, function(statusCode) {

        var method = _.camelCase(statusCode.status);
        var code = statusCode.code;

        //extend http response with the custom response type methods
        response[method] = response[code] = function() {
            response.status(code);
            return success.apply(response, arguments);
        };
    });
};