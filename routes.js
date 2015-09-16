var server = require('./server');

var resources = require('./resources');

server.post('/api/tokens/', resources.token.create);
server.get('/api/tokens/:study/:resource/',resources.token.read);
server.del('/api/tokens/:study/:resource/',resources.token.deleteAll);

