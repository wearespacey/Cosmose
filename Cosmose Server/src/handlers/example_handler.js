const { service } = require('../services/example_service');

module.exports.handler = (event, context, callback) => {
  let response;
  try {
    const result = service.doSomething();
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
