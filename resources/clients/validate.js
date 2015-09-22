'use strict';

var Joi = require('joi');

var createClientParamsSchema = Joi.object().keys({
    'name': Joi.string().min(3).max(255).required(),
});

module.exports.isValidCreateClientParams = function (data, callback) {
    Joi.validate(data, createClientParamsSchema, callback);
};

