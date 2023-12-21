const mqtt = require('mqtt');
const makeColourBroker = require('./colourBroker');
const client = mqtt.connect(process.env.COLOUR_BROKER_URL);

// client.on('connect', () => {});
// client.on('message', (topic, message) => {});

module.exports = makeColourBroker({ client });