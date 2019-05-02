const { service } = require('../services/signup_service');

module.exports.handler = (event, context, callback) => {
  let response;
  try {
    const params = JSON.parse(event.body);
    const result = service.addUser(params["login"], params["email"], params["password"]);
    
    response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work 
      },
      body: true,
    };
  } catch (error) {
    response = {
      statusCode: 500,
      body: error,
    };
  }
  
  callback(null, response);
};
