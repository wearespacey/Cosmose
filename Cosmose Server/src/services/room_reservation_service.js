const AWS = require('aws-sdk');
const dynamoClient = new AWS.DynamoDB.DocumentClient();

class RoomReservationService {
  constructor(client) {
    this.client = client;
  }

  reserve() {
    this.init();
    return "it works";
  }
}

module.exports.RoomReservationService = RoomReservationService;
module.exports.service = new RoomReservationService(dynamoClient);
