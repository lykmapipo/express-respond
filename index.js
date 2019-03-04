'use strict';


/* dependencies */
const _ = require('lodash');
const { isProduction } = require('@lykmapipo/env');
const { STATUS_CODES } = require('statuses');


/**
 * @function normalizeError
 * @name normalizeError
 * @description normalize error to common accepted error response body
 * @param {Error} error valid error instance
 * @param {String} [code=500] valid http response status code
 * @see {@link https://jsonapi.org/format/#errors}
 * @return {Object} formatted error response body
 * @author lally elias <lallyelias87@mail.com>
 * @since  1.1.0
 * @version 0.1.0
 * @license MIT
 * @private
 * @example
 * const body = normalizeError(new Error('Missing API Key'));
 * //=> { message: 'Missing API Key', ... }
 */
const normalizeError = (error, code = 500) => {
  // ensure error instance
  if (!_.isError(error)) { return error; }

  // prepare error payload
  const body = {};
  body.status = (error.status || code);
  body.code = (error.code || code);
  body.name = (error.name || 'Error');
  body.message = (error.message || STATUS_CODES[code]);
  body.description = (error.description || error.message || STATUS_CODES[code]);
  body.errors = (error.errors || undefined); // error bag
  body.stack = (isProduction() ? undefined : error.stack); // error stack

  // return formatted error response
  return body;
};


/**
 * @function prepareBody
 * @name prepareBody
 * @description prepare response body
 * @param {Mixed} [data] valid response body
 * @param {String} [code=500] valid http response status code
 * @return {Object} formatted response body
 * @author lally elias <lallyelias87@mail.com>
 * @since  1.1.0
 * @version 0.1.0
 * @license MIT
 * @private
 * @example
 * const body = prepareBody(new Error('Missing API Key'));
 * //=> { message: 'Missing API Key', ... }
 *
 * const body = prepareBody({ name: 'lykmapipo' });
 * //=> { name: 'lykmapipo' }
 */
const prepareBody = (data, code = 500) => {
  // build response base on http status code
  if (!data) {
    const status = code;
    const message = STATUS_CODES[code];
    const description = STATUS_CODES[code];
    return { status, code, message, description };
  }

  // handle error or data
  let body = {};
  body = _.isError(data) ? normalizeError(data, code) : data;

  // return formatted response body
  return body;
};


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
 * const respond = require('express-respond');
 *
 * const app = express();
 * app.use(respond);
 *
 * app.get('/', (request, response) => {
 *   response.ok({ name: 'lykmapipo' });
 * });
 */
function respond(request, response, next) {

  // map http status code to response method
  const HTTP_STATUS_CODES = _.merge({}, STATUS_CODES);
  _.forEach(HTTP_STATUS_CODES, function mapStatusToResponse(status, code) {

    // prepare response method
    const method = _.camelCase(status);

    // extend http response with the custom response type method
    response[method] = response[code] = function httpReply(data) {
      // set response status
      response.status(code);

      // prepare response body
      const body = prepareBody(data, code);

      // respond with json body
      response.json(body);
    };

  });

  // continue with middleware chain
  next();

}


/* export respond middleware */
module.exports = exports = respond;
