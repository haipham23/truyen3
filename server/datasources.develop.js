'use strict';

const process = require('process');

module.exports = {
  'mongodb': {
    connector: 'mongodb',
    hostname: process.env.MONGODB_SERVICE_HOST || '192.168.99.100' ,
    port: process.env.MONGODB_SERVICE_PORT || '32769',
    database: process.env.MONGODB_DATABASE || 'truyen'
  }
};
