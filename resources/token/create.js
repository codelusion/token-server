'use strict';

var uuid = require('node-uuid');
var datastore = require('./../datastore');
var validate = require('./validate');
var util = require('./util');

module.exports = function create(req, res,next) {
   if (req.params.clientId) {
       createToken(req, res, next);
   }  else {
       createClient(req, res, next);
   }
};

function createClient(req, res, next) {
    validate.isValidStudyResource(req.params, function(err, value) {
        if (err === null ) {
            var expires = new Date();
            expires.setDate(new Date().getDate() + 365);
            var token =                 {
                'clientId' : getApiId(),
                'clientSecret': uuid.v4(),
                'study': value.study,
                'resource': value.resource,
                'expires': expires
            };
            datastore.persist(token, function(err, token) {
                if (err) {
                    console.error(err);
                    res.send(500,  {'code': 'DatabaseError', 'message': 'A database error occurred'})
                } else {
                    res.send(util.format(token));
                }
            });
        } else {
            res.send(400, {'code': 'InvalidParams', 'message': 'Expected parameters not found'});
        }
    });
    next();
}

function createToken(req, res, next) {
    validate.isValidStudyResourceClient(req.params, function(err, value) {
        if (err === null ) {
            var expires = new Date();
            expires.setDate(new Date().getDate() + 365);
            var token =                 {
                'clientId' : value.clientId,
                'clientSecret': uuid.v4(),
                'study': value.study,
                'resource': value.resource,
                'expires': expires
            };
            datastore.persist(token, function(err, token) {
                if (err) {
                    console.error(err);
                    res.send(500,  {'code': 'DatabaseError', 'message': 'A database error occurred'})
                } else {
                    res.send(util.format(token));
                }
            });
        } else {
            res.send(400, {'code': 'InvalidParams', 'message': 'Expected parameters not found'});
        }
    });
    next();
}


function getApiId() {
    var min = 10000, max = 999999999;
    return 'ws' + Math.floor(Math.random() * (max - min)) + min;
}