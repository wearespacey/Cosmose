const { service } = require('../services/signin_service');

module.exports.handler = async (event, context, callback) => {
  let response;
  try {
    const params = event.queryStringParameters;
    const result = await service.verify(params['login'], params['password']);
    response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work 
      },
      body: JSON.stringify(result),
    };

  } catch (error) {
    response = {
      statusCode: 500,
      body: error,
    };
  }

  return response;
};