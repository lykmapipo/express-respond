'use strict';

//dependencies
const _ = require('lodash');
const path = require('path');

/**
 * @description normalize response methods parameters
 * @param  {String}   [view]     valid view path
 * @param  {Object|Error}   [data]     data or error to respond with
 * @param  {Function} [callback] optional callback to invoke in case of `render` error
 * @return {Object}            normalized object to use for response methods
 */
module.exports = function(view, data, callback) {
    const app = this.app;

    //prepare normalized arguments
    const normalized = {
        view: view,
        data: data,
        callback: callback
    };

    //detect a view
    const viewEngine = app && app.get ? app.get('view engine') : app['view engine'];
    const viewExtensions = _.union(['.html', '.ejs'], [
        ['', viewEngine].join('.')
    ]);
    const viewExtension = _.isString(view) ? path.extname(view) : undefined;

    const isView = viewExtension &&
        _.isString(view) &&
        _.indexOf(viewExtensions, viewExtension) !== -1;

    if (!isView) {
        normalized.data = view;
        normalized.view = undefined;
    }

    //if error is passed instead of data
    if (_.isError(data)) {
        normalized.data = undefined;
        normalized.error = data;
    }

    //export normalized response arguments
    return normalized;
};