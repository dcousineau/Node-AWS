var _      = require('underscore')
  , amazon = require('./amazon');

/**
 * @constructor
 * @param {Auth} auth Authentication object
 */
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

/**
 * Returns US East 1 hostname by default
 *
 * @returns {string}
 */
SimpleDB.prototype.getDefaultHostname = function() {
    return SimpleDB.REGION_US_E1;
};

/**
 * The ListDomains operation lists all domains associated with the Access Key ID. 
 * It returns domain names up to the limit set by MaxNumberOfDomains. A NextToken 
 * is returned if there are more than MaxNumberOfDomains domains. Calling ListDomains 
 * successive times with the NextToken returns up to MaxNumberOfDomains more domain 
 * names each time.
 *
 * @params {Object} params
 * @params {string} [params.MaxNumberOfDomains] Default to 100
 * @params {string} [params.NextToken]
 */
SimpleDB.prototype.listDomains = function(params) {
    return this.do('ListDomains', params);
};