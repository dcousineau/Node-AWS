var _     = require('underscore')
  , https = require('https')
  , url   = require('url');


var _defaultOpts = {
    method: 'GET'
};

var Request = module.exports = exports = function(hostname, params, opts) {
    this.opts   = _.defaults(opts || {}, _defaultOpts);
    this.params = params || {};
};

Request.prototype.execute = function(completeCallback, errorCallback) {
    setTimeout(completeCallback, 5);
};