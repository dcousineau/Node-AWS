var _      = require('underscore')
  , amazon = require('./amazon');

var SimpleDB = module.exports = exports = function (auth) {
    this.auth = auth;
}

SimpleDB.prototype.__proto__ = amazon.prototype;

SimpleDB.REGION_US_E1     = 'sdb.amazonaws.com';
SimpleDB.REGION_US_W1     = 'sdb.us-west-1.amazonaws.com';
SimpleDB.REGION_US_W2     = 'sdb.us-west-2.amazonaws.com';
SimpleDB.REGION_EU_W1     = 'sdb.eu-west-1.amazonaws.com';
SimpleDB.REGION_APAC_SE1  = 'sdb.ap-southeast-1.amazonaws.com';
SimpleDB.REGION_APAC_NE1  = 'sdb.ap-northeast-1.amazonaws.com';

SimpleDB.prototype.getDefaultHostname = function(hostname) {
    return SimpleDB.REGION_US_E1;
};

SimpleDB.prototype.listDomains = function(params) {
    return this.do('ListDomains', params);
};