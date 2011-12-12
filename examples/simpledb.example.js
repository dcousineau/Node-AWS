var Amazon = require('../index');

var auth = new Amazon.Util.Auth('123', '123')
  , simpledb = new Amazon.SimpleDB(auth);

simpledb.listDomains().on('complete', function(data){
    console.log(data);
});