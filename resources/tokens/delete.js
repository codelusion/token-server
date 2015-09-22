'use strict';

var validate = require('./validate');
var datastore = require('./datastore');

module.exports = function del(req, res, next) {
    if (req.params.clientId) {
        deleteToken(req, res, next)
    } else {
        deleteTokens(req, res, next)
    }
};

function deleteTokens(req, res, next) {
    delete(req.params.clientId);
    validate.isValidStudyResource(req.params, function (err, value) {
        var key = {study: value.study, resource: value.resource};
        processRequest(err, res, key)
    });
    next();
}


function deleteToken(req, res, next) {
    validate.isValidStudyResourceClient(req.params, function (err, value) {
        var key = {study: value.study, resource: value.resource, clientId: value.clientId};
        processRequest(err, res, key)
    });
    next();
}

function processRequest(err, res, key) {
    if (err === null) {
        datastore.locate(key, function (err, token) {
            if (err || !token) {
                res.send(404, {'code': 'NotFound', 'message': 'Resource not found'});
            } else {
                datastore.removeAll(key, function (err, token) {
                    if (err) {
                        console.log(err);
                        res.send(500, {'code': 'InternalError', 'message': 'An internal error occurred'});
                    } else {
                        res.send(204);
                    }
                });
            }
        });
    } else {
        res.send(400, {'code': 'InvalidParams', 'message': 'Expected parameters not found'});
    }
}