'use strict';

var Joi = require('joi');

var tokenParamsSchema = Joi.object().keys({
    'resource': Joi.string().min(3).max(255).required(),
    'study': Joi.string().min(3).max(255).required()
});

module.exports.isValid = function(data, callback) {
    Joi.validate(data, tokenParamsSchema, callback);
};
