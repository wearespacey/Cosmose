const { service } = require('../services/sendmail_service');

module.exports.handler = (event, context, callback) => {
  let response;
  try {
    let { mails } = event.queryStringParameters;
    console.log(mails);
    const result = service.sendMail(JSON.parse(mails));
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
