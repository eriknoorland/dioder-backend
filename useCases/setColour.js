module.exports = function makeSetColour({ colourBroker }) {
  return async function setColour({ topics, colour }) {
    topics.forEach(topic => {
      colourBroker.publish(topic, { colour });
    });
  };
};