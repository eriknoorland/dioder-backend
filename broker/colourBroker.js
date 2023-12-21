module.exports = function makeColourBroker({ client }) {
  return Object.freeze({
    publish,
  });

  async function publish(topic, message) {
    client.publish(topic, JSON.stringify(message));
  };
};