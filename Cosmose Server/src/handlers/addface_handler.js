const { service } = require('../services/faceapi_service');

module.exports.handler = async (event, context, callback) => {
    let response;
    let personId = event.queryStringParameters.personId;
    try {
     const result = await service.addFace(event.body,"1", personId);
     console.log(result);
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
  