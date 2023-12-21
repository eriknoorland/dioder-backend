module.exports = function makePostColour ({ setColour }) {
  return async function postColour(httpRequest) {
    try {
      const { topics, colour } = httpRequest.body;

      await setColour({ topics, colour });

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        body: {},
      };
    } catch (e) {
      // TODO: Error logging
      console.log(e);

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: e.message,
        }
      }
    };
  };
};