const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const urlencode = bodyParser.urlencoded({ extended: false });
const mqttClient  = mqtt.connect('mqtt://skynet.local:1881');

let isMqttConnected = false;

mqttClient.on('connect', () => {
  isMqttConnected = true;
});

mqttClient.on('message', (topic, message) => {
  // message is Buffer
  // console.log(message.toString());
  // mqttClient.end();
});

router.use(urlencode);
router.use(bodyParser.json());

router.route('/')
  .post((request, response) => {
    const colour = request.body.colour;

    let isColorValid = true;

    if (!Array.isArray(colour)) {
      isColorValid = false;
    }

    if (colour.length !== 3) {
      isColorValid = false;
    }

    colour.forEach(value => {
      if (value < 0 || value > 255) {
        isColorValid = false;
      }
    });

    if (!isColorValid) {
      return response
        .status(422)
        .json({
          error: {
            message: 'The provided colour is not valid',
          },
        });
    }

    if (!isMqttConnected) {
      return response
        .status(503)
        .json({
          error: {
            message: 'The MQTT service is not available',
          },
        });
    }

    mqttClient.publish('desk_led', JSON.stringify({ colour: colour }));

    response
      .status(204)
      .send();
  });

module.exports = router;
