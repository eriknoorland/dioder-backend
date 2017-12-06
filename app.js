/* globals module, __dirname */

// require('shelljs/global');

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

// var Redoid = require('redoid');
// var Gpio = require('onoff').Gpio;

var app = express();
var server = http.createServer(app);

// var io = require('socket.io').listen(server);

// var redoid = Redoid();
// var led = new Gpio(23, 'out');

// var State = {
//   ON: 'on',
//   OFF: 'off'
// };

// var _state = State.ON;
// var _colour = '#0000ff';

var transitionDuration = 250;
var defaultColour = '00f';
var favorites = ['f00', 'ff0', '0f0', '0ff', '00f'];

app.use('/', express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/colour', function(request, response) {
  response
    .status(200)
    .json({ data: '00f' }); // redoid.getColorHexValue()
});

app.post('/colour', function(request, response) {
  var colour = request.body.colour;
  // var isColorValid = redoid.isColorValid(colour);

  // if (!isColorValid) {
  //   return response
  //     .status(422)
  //     .json({
  //       error: {
  //         message: 'The provided colour is not valid',
  //       },
  //     });
  // }

  // redoid.stop();
  // redoid.transition(colour, transitionDuration);
  // redoid.setLoopTransition(false);

  response
    .status(204)
    .send();
});

app.get('/status', function(request, response) {
  response.status(200);
});

app.post('/status', function(request, response) {
  response
    .status(204)
    .send();
});

app.get('/favorites', function(request, response) {
  response
    .status(200)
    .json({ data: favorites });
});

app.post('/favorites', function(request, response) {
  var colour = request.body.colour;
  var isFavorite = favorites.indexOf(colour) !== -1;

  if (isFavorite) {
    return response
      .status(422)
      .json({
        error: {
          message: 'The provided colour is already a favorite',
        },
      });
  }

  favorites.push(colour);
  return response.status(201);
});

app.delete('/favorites/:colour', function(request, response) {
  var colour = request.params.colour;
  var index = favorites.indexOf(colour);
  var isFavorite = index !== -1;

  if (!isFavorite) {
    return response
      .status(404)
      .json({
        error: {
          message: 'The provided colour was not a favorite',
        },
      });
  }

  favorites.splice(index, 1);
  response
    .status(204)
    .send();
});

app.get('/shutdown', function(request, response) {
  // redoid.stop();
  // exec('sudo shutdown -h now');

  response
    .status(204)
    .send();
});

// // open socket connection
// io.on('connection', function(socket) {
//   socket.emit('connected', {
//     state: _state,
//     colour: _colour
//   });

//   /**
//    * State toggle request handler
//    */
//   socket.on('toggleStateRequest', function() {
//     _state = (_state === State.ON ? State.OFF : State.ON);

//     redoid.stop();
//     redoid.setLoopTransition(false);

//     if(_state === State.ON) {
//       redoid.transition(_colour, 250);
//     } else {
//       _colour = redoid.getColorHexValue();
//       redoid.turnOff();
//     }

//     io.sockets.emit('toggleState', {
//       state: _state
//     });
//   });

//   /**
//    * Colour change request handler
//    */
//   socket.on('colourChangeRequest', function(data) {
//     redoid.stop();
//     redoid.transition(data.colour, 250);
//     redoid.setLoopTransition(false);

//     _colour = data.colour;
//     _state = State.ON;

//     socket.broadcast.emit('colourChange', {
//       colour: _colour
//     });

//     io.sockets.emit('toggleState', {
//       state: _state
//     });
//   });

//   socket.on('colourTransitionRequest', function() {
//     var delay = 4000;

//     redoid.stop();
//     redoid.setLoopTransition(true);
//     redoid.transition('#ff0000', delay);
//     redoid.transition('#00ff00', delay);
//     redoid.transition('#0000ff', delay);
//     redoid.transition('#ff00ff', delay);

//     _state = State.ON;

//     io.sockets.emit('toggleState', {
//       state: _state
//     });
//   });

//   /**
//    * Shutdown request handler
//    */
//   socket.on('shutdownRequest', function(data) {
//     redoid.stop();

//     socket.emit('shutdown', {
//       state: _state
//     });

//     // shelljs execute shutdown command
//     exec('sudo shutdown -h now');
//   });
// });

// turn status LED on
// led.writeSync(1);

module.exports = server;
