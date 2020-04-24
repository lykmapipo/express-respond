'use strict';


/* dependencies */
const _ = require('lodash');
const { mapErrorToObject, STATUS_CODES } = require('@lykmapipo/common');
const { isProduction } = require('@lykmapipo/env');

// TODO: just extend response directly

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
  const stack = !isProduction();
  let body = {};
  body = _.isError(data) ? mapErrorToObject(data, { code, stack }) : data;

  // return formatted response body
  return body;
};


/**
 * @function mapToHttpReply
 * @name mapToHttpReply
 * @description generate http reply method based on http status
 * @param {Object} response valid express http response object
 * @param {String} code valid http response status code
 * @param {Mixed} data http response payload
 * @author lally elias <lallyelias87@mail.com>
 * @since  1.2.0
 * @version 0.1.0
 * @license MIT
 * @private
 */
const mapToHttpReply = (response, code) => data => {
  // prepare http status
  let status = _.get(data, 'status', code);

  // FIX: RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code
  // FIX: if response data has status field for business logics
  status = (_.isNumber(status) || _.isString(status)) ? status : code;

  // set response status
  response.status(status);

  // respond with json body
  const ignoreBody = _.includes([204, 304], _.toNumber(status));
  if (ignoreBody) {
    return response.json();
  }

  // prepare response body
  const body = prepareBody(data, status);
  return response.json(body);
};


/**
 * @function mapStatusToMethod
 * @name mapStatusToMethod
 * @description map http status to named response method
 * @param {Object} response valid express http response object
 * @param {String} status valid http response status message
 * @param {String} code valid http response status code
 * @author lally elias <lallyelias87@mail.com>
 * @since  1.2.0
 * @version 0.1.0
 * @license MIT
 * @private
 */
const mapStatusToMethod = response => (status, code) => {
  // prepare response method from http status message
  const method = _.camelCase(status);

  // extend http response with the custom response type method
  const httpReply = mapToHttpReply(response, code);
  response[method] = response[code] = httpReply;
};


/**
 * @function respond
 * @name respond
 * @description common http responses for expressjs
 * @param {Object} request valid express http request object
 * @param {Object} response valid express http response object
 * @param {Function} next a middleware to invoke for continuation
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
const respond = (request, response, next) => {
  // map http status code to http response method
  _.forEach(STATUS_CODES, mapStatusToMethod(response));

  // add error response method
  response.error = mapToHttpReply(response, 500);

  // continue with middleware chain
  next();
};


/* export respond middleware */
module.exports = exports = respond;
