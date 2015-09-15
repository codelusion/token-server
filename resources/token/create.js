'use strict';

var uuid = require('node-uuid');
var Joi = require('joi');

var createTokenSchema = Joi.object().keys({
    'resource': Joi.string().min(3).max(255).required(),
    'study': Joi.string().min(3).max(255).required()
});

module.exports = function createToken(req, res, next) {
    Joi.validate(req.params, createTokenSchema, function(err, value) {
        if (err === null ) {
            res.send(
                {
                    'id' : uuid.v4(),
                    'secret': uuid.v4(),
                    'study': value.study,
                    'resource': value.resource
                });
        } else {
            res.send(400, {'code': 'InvalidParams', 'message': 'Expected parameters not found'});
        }
    });
    next();
};