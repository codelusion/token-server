'use strict';

var Joi = require('joi');

var createClientWithTokenParamsSchema = Joi.object().keys({
    'resource': Joi.string().min(3).max(255).required(),
    'study': Joi.string().min(3).max(255).required()
});

var createTokenForClientParamsSchema = Joi.object().keys({
    'resource': Joi.string().min(3).max(255).required(),
    'study': Joi.string().min(3).max(255).required(),
    'clientId': Joi.string().min(3).max(255).required()
});


module.exports.isValidStudyResource = function(data, callback) {
    Joi.validate(data, createClientWithTokenParamsSchema, callback);
};


module.exports.isValidStudyResourceClient = function(data, callback) {
    Joi.validate(data, createTokenForClientParamsSchema, callback);
};
