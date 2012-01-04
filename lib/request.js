var _           = require('underscore')
  , https       = require('https')
  , url         = require('url')
  , querystring = require('querystring')
  , futures     = require('futures')
  , xml2js      = require('xml2js');


var _defaultOpts = {
    method: 'GET'
  , path: '/'
};

/**
 * @constructor
 * @param {string} hostname Service hostname
 * @param {Object} params GET/PUT/POST/DELETE params
 * @param {Object} opts
 * @param {string} [opts.path] Defaults to '/'
 * @param {string} [opts.method] HTTP method, defaults to 'GET'
 */
var Request = module.exports = exports = function(hostname, params, opts) {
    this.hostname = hostname;
    this.opts     = _.defaults(opts || {}, _defaultOpts);
    this.params   = params || {};
};

/**
 * Asynchronously executes request, returns a futures object (@see https://github.com/coolaj86/futures) that will be fulfilled
 *
 * @returns {Future}
 */
Request.prototype.execute = function() {
    var that = this
      , future = futures.future(this);
    
    var body = querystring.stringify(this.params);
    
    var options = {
        host: this.hostname,
        path: this.opts.path + '?' + body,
        method: this.opts.method
    };
    
    var req = https.request(options, function(res){
        res.setEncoding('UTF-8');
        
        var body = "";
        res.on('data', function(chunk) {
            body += chunk.toString();
        });
        
        res.on('end', function(){
            var parser = new xml2js.Parser();
            
            parser.addListener('end', function(result) {
                delete result['@'];
                
                if (result.Errors)
                    // @todo More sophisticated error handling and normalization
                    future.fulfill(result.Errors.Error.Message, undefined);
                else
                    // @todo More sophisticated normalization?
                    future.fulfill(undefined, result);
            });
            
            parser.parseString(body);
        });
    });
    
    req.on('error', function(e){
        future.fulfill(e, undefined);
    });
    
    req.end();
    
    return future;
};