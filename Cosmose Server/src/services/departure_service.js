const AWS = require('aws-sdk');
const dynamoClient = new AWS.DynamoDB.DocumentClient();

class DepartureService {
    constructor(client) {
        this.client = client;
    }

    async leaving(login) {
        console.log(login);
        const result = await this.client.query({
            TableName: 'Rocket',
            KeyConditionExpression: 'Login = :login',
            ExpressionAttributeValues: {
              ':login': login,
            },
          }).promise();
        console.log(result);
        const rocket = result.Items[0];
        rocket.Position = 'Out';
        await this.client.put({
            TableName: 'Rocket',
            Item: rocket,
          }).promise();
        return "it works";
    }
}

module.exports.DepartureService = DepartureService;
module.exports.service = new DepartureService(dynamoClient);
