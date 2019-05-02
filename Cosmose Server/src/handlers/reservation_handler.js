const { service } = require('../services/room_reservation_service');

module.exports.handler = (event, context, callback) => {
  let response;
  try {
    const result = service.reserve();
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
