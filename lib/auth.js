var Auth = module.exports = exports = function(key, secret, token) {
    this.key = key;
    this.secret = secret;
    this.token = token;
}

Auth.prototype.signRequest = function(request) {
    
};