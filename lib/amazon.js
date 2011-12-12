var EventEmitter = require('events').EventEmitter;

var Amazon = module.exports = exports = function () {
    this.hostname = null;
};

Amazon.prototype.__proto__ = EventEmitter.prototype;

Amazon.prototype.setHostname = function(hostname) {
    this.hostname = hostname;
};

Amazon.prototype.getHostname = function() {
    return this.hostname || this.getDefaultHostname();
};

Amazon.prototype.getDefaultHostname = function() {
    throw "Default Hostname Not Defined";
};

Amazon.prototype.do = function(action, params, opts, hostname) {
    var that = this;
    
    opts = opts || {};
    hostname = hostname || this.getDefaultHostname();
    
    var request = new Amazon.Util.Request(hostname, opts, params);
    
    this.auth && this.auth.sign(request);
    
    request.execute(function(data){
        that.emit('complete', data);
    });
    
    return this;
};

Amazon.Util = {};

Amazon.Util.Auth = require('./auth');
Amazon.Util.Request = require('./request');
Amazon.SimpleDB = require('./simpledb');