/**
 * @constructor
 */
var Amazon = module.exports = exports = function (auth) {
    this.auth = auth;
};

/**
 * Set hostname for service
 * 
 * @param {string} hostname
 */
Amazon.prototype.setHostname = function(hostname) {
    this.hostname = hostname;
};

/**
 * Get currently set hostname OR default hostname for service
 * 
 * @returns {string}
 */
Amazon.prototype.getHostname = function() {
    return this.hostname || this.getDefaultHostname();
};

/**
 * Clients should override this method
 */
Amazon.prototype.getDefaultHostname = function() {
    throw "Default Hostname Not Defined";
};

/**
 * Form and execute a request against an AWS service
 *
 * @param {string} action AWS action to complete
 * @param {Object} params GET/PUT/POST/DELETE params
 * @param {Object} opts Other opts to be used the request
 * @param {string} hostname Override hostname, otherwise use set hostname
 * @returns {Future} Future object
 */
Amazon.prototype.do = function(action, params, opts, hostname) {
    var that = this;
    
    params = params || {};
    opts = opts || {};
    hostname = hostname || this.getHostname();
    
    params['Action'] = action;
    
    var request = new Amazon.Util.Request(hostname, params, opts);
    
    this.auth && this.auth.sign(request);
    
    return request.execute();
};

Amazon.Util = {};

Amazon.Util.Auth = require('./auth');
Amazon.Util.Request = require('./request');
Amazon.SimpleDB = require('./simpledb');