var server = require('./server');

var resources = require('./resources');

server.post('/api/token/', resources.token.create);
server.get('/api/token/:study/:resource/',resources.token.read);
server.put('/api/token/:study/:resource/',resources.token.update);
server.del('/api/token/:study/:resource/',resources.token.delete);