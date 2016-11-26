/* globals module, __dirname */

var express = require('express');
var app = express();

var Gpio = require('onoff').Gpio;
var led = new Gpio(23, 'out');

// serve static files on index for the connected client
app.use('/', express.static(__dirname + '/static'));

var leds = require('./routes/leds');
app.use('/leds', leds);

// turn status LED on
led.writeSync(1);

module.exports = app;
