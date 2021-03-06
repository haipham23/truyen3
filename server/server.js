'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const logger = require('winston');

let app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('Server Started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    logger.info('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      logger.info('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
