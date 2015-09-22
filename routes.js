var server = require('./server');

var resources = require('./resources');
server.post('/api/clients/', resources.clients.create);
server.post('/api/clients', resources.clients.create);
server.post('/api/tokens/', resources.tokens.create);
server.post('/api/tokens', resources.tokens.create);
server.get('/api/tokens/:study/:resource/',resources.tokens.read);
server.get('/api/tokens/:study/:resource',resources.tokens.read);
server.get('/api/tokens/:study/:resource/:clientId',resources.tokens.read);
server.get('/api/tokens/:study/:resource/:clientId/',resources.tokens.read);
server.del('/api/tokens/:study/:resource/', resources.tokens.delete);
server.del('/api/tokens/:study/:resource', resources.tokens.delete);
server.del('/api/tokens/:study/:resource/:clientId/',resources.tokens.delete);
server.del('/api/tokens/:study/:resource/:clientId',resources.tokens.delete);

