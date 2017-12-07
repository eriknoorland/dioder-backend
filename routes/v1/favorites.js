var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
var urlencode = bodyParser.urlencoded({ extended: false });

var favorites = ['f00', 'ff0', '0f0', '0ff', '00f'];

router.use(urlencode);
router.use(bodyParser.json());

router.route('/')
  .get(function(request, response) {
    response
      .status(200)
      .json({ data: favorites });
  })

  .post(function(request, response) {
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
    response.status(201).send();
  })

  .delete(function(request, response) {
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
    response.status(204).send();
  });

module.exports = router;
