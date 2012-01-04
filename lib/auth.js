var _           = require('underscore')
  , querystring = require('querystring')
  , crypto      = require('crypto');

/**
 * @constructor
 * @param {string} key Access Key
 * @param {string} secret Secret Key
 * @param {string} token Token
 */
var Auth = module.exports = exports = function(key, secret, token) {
    this.key = key;
    this.secret = secret;
    this.token = token;
}

/**
 * Sign given request
 *
 * @param {Request} request
 */
Auth.prototype.sign = function(request) {
    _.extend(request.params, {
        AWSAccessKeyId: this.key
      , SignatureVersion: 2
      , SignatureMethod: 'HmacSHA256'
      , Version: request.opts.version || '2009-04-15'
      , Timestamp: new Date().toISOString()
    });
    
    var sortedParams = _(request.params).chain()
        .map(function(v, k) { return [k,v]; })
        .sortBy(function(a) { return a[0]; })
        .reduce(function(s, v){ s[v[0]] = v[1]; return s; }, {})
        .value();
    
    var toSign = [request.opts.method, request.hostname, request.opts.path, querystring.stringify(sortedParams)].join("\n");
    
    var signature = crypto.createHmac('sha256', this.secret).update(toSign).digest('base64');
    
    request.params['Signature'] = signature;
};