const { service } = require('../services/faceapi_service');

module.exports.handler = async (event, context, callback) => {
    let response;
    try {
      const result = await service.getGroup();
      response = {
        headers:{
          'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200,
        body: JSON.stringify(result),
      };
    } catch (error) {
      response = {
        statusCode: 500,
        body: error,
      };
    }
    
    callback(null, response);
};
  