const AWS = require('aws-sdk');
const dynamoClient = new AWS.DynamoDB.DocumentClient();

class ContextService {
  constructor(client) {
    this.client = client;
  }

  async init() {
    const rockets = [
      {
        Login: 'keusmar',
        Mail: '',
        Position: 'Out',
        Team: 'CosmoseTeam',
        FaceID: 'aef0a922-6eba-4c8b-a314-d1a1f8096aa6',
        Password: 'test',
      },
      {
        Login: 'servgui',
        Mail: '',
        Position: 'Out',
        Team: 'CosmoseTeam',
        FaceID: 'cf92df36-f125-4a1d-bf9d-e7bacd6ee334',
        Password: 'test',
      },
      {
        Login: 'servdav',
        Mail: '',
        Position: 'Out',
        Team: 'SpaceY',
        FaceID: '426462c3-1b01-41cf-96b4-8d3413c2ae0b',
        Password: 'test',
      },
      {
        Login: 'toto',
        Mail: '',
        Position: 'Out',
        Team: 'SpaceY',
        FaceID: '70b197ba-15ab-42d3-883b-ac67408b8258',
        Password: 'test',
      },
    ]
    const rooms = [
      {
        Floor: '1',
        Name: 'Armstrong',
        Occuped: 'None',
      },
      {
        Floor: '1',
        Name: 'Liwei',
        Occuped: 'None',
      },
      {
        Floor: '1',
        Name: 'Ride',
        Occuped: 'None',
      },
      {
        Floor: '1',
        Name: 'Pesquet',
        Occuped: 'None',
      },
      {
        Floor: '1',
        Name: 'Hadfield',
        Occuped: 'None',
      },
    ];
    const openSpaces = [
      {
        Floor: '1',
        Name: 'Apollo',
      },
      {
        Floor: '1',
        Name: 'Hubble',
      },
      {
        Floor: '1',
        Name: 'Viking',
      },
      {
        Floor: '1',
        Name: 'Voyager',
      },
      {
        Floor: '1',
        Name: 'Pioneer',
      },
    ]
    const teams = [
      {
        Floor: '1',
        Name: 'SpaceY',
        Members: [
          {
            Login: 'toto',
          },
          {
            Login: 'servdav',
          },
        ],
      },
      {
        Floor: '1',
        Name: 'CosmoseTeam',
        Members: [
          {
            Login: 'keusmar',
          },
          {
            Login: 'servgui',
          },
          {
            Login: 'titi',
          }
        ],
      },
    ]
    rooms.forEach(room => {
      this.client.put({
        TableName: 'Room',
        Item: room,
      }).promise();
    });
    openSpaces.forEach(openSpace => {
      this.client.put({
        TableName: 'OpenSpace',
        Item: openSpace,
      }).promise();
    });
    rockets.forEach(rocket => {
      this.client.put({
        TableName: 'Rocket',
        Item: rocket,
      }).promise();
    });
    teams.forEach(team => {
      this.client.put({
        TableName: 'Team',
        Item: team,
      }).promise();
    });
  }

}

module.exports.ContextService = ContextService;
module.exports.service = new ContextService(dynamoClient);
