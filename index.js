var server = require('./server');

var PORT = process.env.PORT || 8000;

server.listen(PORT, function(){
    console.log('server running on %j: ' , server.address());
});
