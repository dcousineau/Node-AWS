var _      = require('underscore')
  , amazon = require('./amazon');

var SimpleDB = module.exports = exports = function (auth) {
    this.auth = auth;
}

SimpleDB.prototype.__proto__ = amazon.prototype;


SimpleDB.prototype.listDomains = function(opts) {
    this.authenticate('ListDomains', opts)
};