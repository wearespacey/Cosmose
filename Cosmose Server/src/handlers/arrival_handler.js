const { service } = require('../services/arrival_service');

module.exports.handler = async (event, context, callback) => {
  let response;
  try {
    const { faceID } = event.pathParameters;
    const result = await service.arrival(faceID);
    response = {
      statusCode: 200,
      body: result,
    };
  } catch (error) {
    response = {
      statusCode: 500,
      body: error,
    };
  }
  
  callback(null, response);
};
