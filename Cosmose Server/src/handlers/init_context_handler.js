const { service } = require('../services/init_context_service');

module.exports.handler = async (event, context, callback) => {
  let response;
  try {
    const result = await service.init();
    response = {
      statusCode: 200,
      body: 'Context has been initialized',
    };
  } catch (error) {
    response = {
      statusCode: 500,
      body: error,
    };
  }
  
  callback(null, response);
};
