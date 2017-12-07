var express = require('express');
var bodyParser = require('body-parser');
// var Redoid = require('redoid');

var router = express.Router();
var urlencode = bodyParser.urlencoded({ extended: false });
// var redoid = Redoid();

router.use(urlencode);
router.use(bodyParser.json());

router.route('/')
  .get(function(request, response) {
    response
      .status(200)
      .json({ data: '00f' }); // redoid.getColorHexValue()
  })

  .post(function(request, response) {
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

module.exports = router;
