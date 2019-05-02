const AWS = require('aws-sdk');
let mailService = require('../services/sendmail_service');
mailService = mailService.service;
const dynamoClient = new AWS.DynamoDB.DocumentClient();

class ArrivalService {
  constructor(client) {
    this.client = client;
  }

  async reserveRoom(team) {
    const result = await this.client.scan({
      TableName: 'Room',
      KeyConditionExpression: "#occuped = :none",
      ExpressionAttributeValues: {
        ':none': 'None',
      },
      ExpressionAttributeNames: {
        '#occuped': 'Occuped',
      },
    }).promise();
    let room = result.Items[0];
    room.Occuped = team.Name;
    await this.client.put({
      TableName: 'Room',
      Item: room,
    }).promise();
    return room;
  }

  async isEveryoneThere(team) {
    const result = await this.client.query({
      TableName: 'Team',
      KeyConditionExpression: '#name = :name',
      ExpressionAttributeValues: {
        ':name': team,
      },
      ExpressionAttributeNames: {
        '#name': 'Name',
      },
    }).promise();
    const members = result.Items[0].Members;
    console.log(result.Items[0]);
    let stopLoop = false;
    let i = 0;
    const mails = [];
    while (i < members.length && !stopLoop) {
      const member = members[i];
      const user = await this.client.query({
        TableName: 'Rocket',
        KeyConditionExpression: 'FaceID = :faceID',
        ExpressionAttributeValues: {
          ':faceID': member.FaceID,
        },
      }).promise();
      console.log(user);
      console.log(user.Position);
      mails.push(user.Items[0].Mail);
      if (user.Items[0].Position === 'Out') {
        stopLoop = true;
      }
      i++;
    }
    if (!stopLoop) {
      const room = await this.reserveRoom(team);
      mailService.sendMail(mails);
    }
  }

  async arrival(faceID) {
    console.log(faceID);
    const result = await this.client.query({
      TableName: 'Rocket',
      KeyConditionExpression: 'FaceID = :faceID',
      ExpressionAttributeValues: {
        ':faceID': faceID,
      },
    }).promise();
    const rocket = result.Items[0];
    rocket.Position = 'In';
    await this.client.put({
      TableName: 'Rocket',
      Item: rocket,
    }).promise();
    this.isEveryoneThere(rocket.Team);
    return `${rocket.Login} is arrived`;
  }
}

module.exports.ArrivalService = ArrivalService;
module.exports.service = new ArrivalService(dynamoClient);
