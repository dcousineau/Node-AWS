var Amazon = require('../index');

var auth = new Amazon.Auth('123', '123')
  , simpledb = new Amazon.SimpleDB(auth);

console.log(simpledb);