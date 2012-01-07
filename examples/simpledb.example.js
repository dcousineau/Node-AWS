var Amazon = require('../index')
  , auth   = require('./examples.auth');

var simpledb = new Amazon.SimpleDB(auth);

simpledb.listDomains().whenever(function(error, data){
    if (error) throw error;
    
    console.log(data);
});