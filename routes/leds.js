/* globals module */

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended: false});

var Redoid = require('redoid');
var redoid = Redoid();

var State = {
  ON: 'on',
  OFF: 'off'
};

var _status = State.ON;
var _colour = '#ffffff';

router.use(urlencode);
router.use(bodyParser.json());

router.route('/state')
  .get(function(request, response) {
    var colour = redoid.getColor();

    response
      .status(200)
      .json({
        colour: colour,
        status: _status
      });
  });

router.route('/toggle')
  .get(function(request, response) {
    if(_status === State.ON) {
      redoid.turnOff();
      _status = State.OFF;
    } else {
      redoid.transition(_colour, 250);
      _status = State.ON;
    }

    response
      .status(200)
      .json({status: _status});
  });

router.route('/:colour')
  .post(urlencode, function(request, response) {
    redoid.stop();
    redoid.transition(request.body.colour, 250);
    _colour = request.body.colour;
    _status = State.ON;

    response
      .status(200)
      .json({
        colour: request.body.colour,
        status: _status
      });
  });

module.exports = router;
