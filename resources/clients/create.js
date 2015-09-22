'use strict';

var datastore = require('./datastore');
var validate = require('./validate');

module.exports = function createClient(req, res, next) {
    validate.isValidCreateClientParams(req.params, function(err, value) {
        if (err === null ) {
            datastore.locate({'name': req.params.name}, function(err, client){
                if (err || !client) {
                    var client =  {
                        'clientId' : getClientId(),
                        'name': req.params.name
                    };
                    datastore.persist(client, function(err, client) {
                        if (err) {
                            console.error(err);
                            res.send(500,  {'code': 'DatabaseError', 'message': 'A database error occurred'})
                        } else {
                            res.send({ 'name' : client.name, 'clientId': client.clientId });
                        }
                    });
                } else {
                    res.send({ 'name' : client.name, 'clientId': client.clientId });
                }
            });
        } else {
            res.send(400, {'code': 'InvalidParams', 'message': 'Expected parameters not found'});
        }
    });
    next();
};

function getClientId() {
    var min = 10000, max = 999999999;
    return 'ws' + Math.floor(Math.random() * (max - min)) + min;
}