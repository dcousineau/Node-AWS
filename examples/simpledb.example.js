var Amazon = require('../index');

var auth = new Amazon.Util.Auth('ACCESS KEY', 'SECRET KEY')
  , simpledb = new Amazon.SimpleDB(auth);

simpledb.listDomains().whenever(function(error, data){
    if (error) throw error;
    
    console.log(data);
});