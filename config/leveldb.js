'use strict';

var level = require('level');
var path = require('path');

var dbPath = process.env.DB_PATH || path.join(__dirname, '../../oauth_db');
var db = level(dbPath, {
        valueEncoding: 'json'
    }
);

module.exports = db;