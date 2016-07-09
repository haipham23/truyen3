'use strict';

const should = require('chai').should(); // eslint-disable-line no-unused-vars
const logger = require('winston');
const codes = require('./codes.json');

module.exports.create = function(code) {
  let obj = _getErr(code),
      error = new Error(obj.message);

  Object.assign(error, obj);

  logger.error(error.name);
  return error;
};

function _getErr(code) {
  return codes[code] || codes['GENERAL'];
}
