const { service } = require('../services/departure_service');

module.exports.handler = async (event, context, callback) => {
  let response;
  try {
    const { login } = event.pathParameters;
    console.log(login);
    const result = await service.leaving(login);
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
