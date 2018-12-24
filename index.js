'use strict';


/* dependencies */
const _ = require('lodash');
const { STATUS_CODES } = require('statuses');


/**
 * @function respond
 * @name respond
 * @description common http responses for expressjs
 * @return {Function} a valid expressjs middleware
 * @author lally elias <lallyelias87@mail.com>
 * @since  1.0.0
 * @version 0.1.0
 * @license MIT
 * @public
 * @example
 * const express = require('express');
 * const response = require('express-respond');
 *
 * const app = express();
 * app.use(respond);
 *
 * app.get('/', (request, response) => {
 *   response.ok({name: 'lykmapipo'});
 * });
 */
function respond(request, response, next) {

  // map http status code to response method
  const HTTP_STATUS_CODES = _.merge({}, STATUS_CODES);
  _.forEach(HTTP_STATUS_CODES, function mapStatusToResponse(status, code) {

    // prepare response method
    const method = _.camelCase(status);

    // extend http response with the custom response type method
    response[method] = response[code] = function httpReply() {
      response.status(code);
      response.json.apply(response, arguments);
    };

  });

  // continue with middleware chain
  next();

}


/* export respond middleware */
module.exports = exports = respond;
