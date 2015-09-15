'use strict';

var Joi = require('joi');

var tokenSchema = Joi.object().keys({
    'resource': Joi.string().min(3).max(255).required(),
    'study': Joi.string().min(3).max(255).required()
});

module.exports.isValid = function(data, callback) {
    Joi.validate(data, tokenSchema, callback);
};
