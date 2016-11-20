/* globals module, __dirname */

var express = require('express');
var app = express();

// serve static files on index for the connected client
app.use('/', express.static(__dirname + '/static'));

var leds = require('./routes/leds');
app.use('/leds', leds);

module.exports = app;
