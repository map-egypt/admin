'use strict';
var logo = require('./logo');
/*
 * App config for production.
 */
module.exports = {
  environment: 'production',
  auth0_token: 'aAMY6pWnvscb5VCePYnH9w1Grv7c7QpH',
  auth0_namespace: 'ifpri-yemen-silo.auth0.com',
  api_root: 'https://ifpri-yemen-silo.herokuapp.com',
  consoleMessage: logo
};

