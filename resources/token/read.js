'use strict';

var validate = require('./validate');
var datastore = require('./../datastore');
var util = require('./util');

module.exports = function read(req, res, next) {
    if (req.params.clientId) {
        getToken(req, res, next)
    } else {
        getTokens(req, res, next)
    }
};

function getTokens(req, res, next) {
    validate.isValidStudyResource(req.params, function (err, value) {
        var key = {study: value.study, resource: value.resource};
        processRequest(err, res, key)
    });
    next();
}


function getToken(req, res, next) {
    validate.isValidStudyResourceClient(req.params, function (err, value) {
        var key = {study: value.study, resource: value.resource, clientId: value.clientId};
        processRequest(err, res, key)
    });
    next();
}

function processRequest (err, res, key) {
    if (err === null ) {
        locate(key, res);
    } else {
        res.send(400, {'code': 'InvalidParams', 'message': 'Expected parameters not found'});
    }
}


function locate(key, res) {
    datastore.locate(key, function(err, tokens) {
        if (err) {
            res.send(500, {'code': 'DataBaseError', 'message': 'A database error occurred'});
        } else {
            if (tokens.length) {
                res.send(util.format(tokens));
            } else {
                res.send(404, {'code': 'NotFound', 'message': 'Resource was not found'});
            }
        }
    });
}