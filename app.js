/* globals module, __dirname */
require('shelljs/global');

var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var Redoid = require('redoid');
var redoid = Redoid();

var Gpio = require('onoff').Gpio;
var led = new Gpio(23, 'out');

var State = {
  ON: 'on',
  OFF: 'off'
};

var _state = State.ON;
var _colour = '#0000ff';

// serve static files on index for the connected client
app.use('/', express.static(__dirname + '/static'));

// open socket connection
io.on('connection', function(socket) {
  socket.emit('connected', {
    state: _state,
    colour: _colour
  });

  /**
   * State toggle request handler
   */
  socket.on('toggleStateRequest', function() {
    _state = (_state === State.ON ? State.OFF : State.ON);

    redoid.stop();
    redoid.setLoopTransition(false);

    if(_state === State.ON) {
      redoid.transition(_colour, 250);
    } else {
      _colour = redoid.getColorHexValue();
      redoid.turnOff();
    }

    io.sockets.emit('toggleState', {
      state: _state
    });
  });

  /**
   * Colour change request handler
   */
  socket.on('colourChangeRequest', function(data) {
    redoid.stop();
    redoid.transition(data.colour, 250);
    redoid.setLoopTransition(false);

    _colour = data.colour;
    _state = State.ON;

    socket.broadcast.emit('colourChange', {
      colour: _colour
    });

    io.sockets.emit('toggleState', {
      state: _state
    });
  });

  socket.on('colourTransitionRequest', function() {
    var delay = 4000;

    redoid.stop();
    redoid.setLoopTransition(true);
    redoid.transition('#ff0000', delay);
    redoid.transition('#00ff00', delay);
    redoid.transition('#0000ff', delay);
    redoid.transition('#ff00ff', delay);

    _state = State.ON;

    io.sockets.emit('toggleState', {
      state: _state
    });
  });

  /**
   * Shutdown request handler
   */
  socket.on('shutdownRequest', function(data) {
    redoid.stop();

    socket.emit('shutdown', {
      state: _state
    });

    // shelljs execute shutdown command
    exec('sudo shutdown -h now');
  });
});

// turn status LED on
led.writeSync(1);

module.exports = server;
