'use strict';

//dependencies
var path = require('path');
var _ = require('lodash');
var negotiate = require(path.join(__dirname, 'lib', 'negotiate'));
var _2xx = require(path.join(__dirname, 'lib', 'responses', '2xx'));

/**
 * @function
 * @description common HTTP responses for expressjs
 * @param  {Object} options - valid internal configuration for express-respond
 * @param {String} options.environment - current application environment. Default 
 *                                     to `app.get('env')` of express application
 * @param {Array.<String>} options.types - accepted response content types in the 
 *                                       order of their significant. Valid types 
 *                                       are `json`, `html` and `text`
 * @param {Array.<String>} options.defaultType - default accepted response content
 *                                             type default to `json`
 * @return {Function} - a valid expressjs middleware
 * @public
 */
module.exports = function(options) {
    //cross check options
    options = options || {};

    //cross check accepted types
    var hasTypes = _.isArray(options.types) && _.size(options.types) > 0;
    options.types = hasTypes ? options.types : ['json', 'html', 'text'];

    //cross check default type
    options.defaultType = options.defaultType || 'json';

    //add negotiate to options
    options.negotiate = negotiate;

    function respond(request, response, next) {
        //cross check current application environment
        options.environment = options.environment ||
            (request.app && request.app.get ? request.app.get('env') : 'development');

        //extend request with respond options
        request._respond = options;

        //extend response with 2xx responses
        _2xx(response);

        //we are done continue with middleware chain
        next();
    }

    //export respond middleware
    return respond;
};