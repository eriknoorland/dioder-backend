const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const urlencode = bodyParser.urlencoded({ extended: false });

const favorites = [
  {
    name: 'Red',
    colour: [255, 0, 0],
  },
  {
    name: '',
    colour: [255, 255, 0],
  },
  {
    name: 'Blue',
    colour: [0, 255, 0],
  },
  {
    name: '',
    colour: [0, 255, 255],
  },
  {
    name: 'Green',
    colour: [0, 0, 255],
  },
  {
    name: 'Purple',
    colour: [255, 0, 255],
  },
];

router.use(urlencode);
router.use(bodyParser.json());

router.route('/')
  .get((request, response) => {
    response
      .status(200)
      .json({ data: favorites });
  })

  .post((request, response) => {
    const colour = request.body.colour;
    const isFavorite = favorites.indexOf(colour) !== -1;

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
    
    response
      .status(201)
      .send();
  })

  .delete((request, response) => {
    const colour = request.params.colour;
    const index = favorites.indexOf(colour);
    const isFavorite = index !== -1;

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
