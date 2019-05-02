const AWS = require('aws-sdk');
const dynamoClient = new AWS.DynamoDB.DocumentClient();

class SigninService {
    constructor() {}

    async verify(login, password){
        const result = await dynamoClient.query({
            TableName: 'Rocket',
            KeyConditionExpression: 'Login = :login',
            FilterExpression: 'Password = :password',
            ExpressionAttributeValues: {
                ':login': login,
                ':password': password,
            },
        }).promise();

        if(result.Items.length > 0){
            return {
                status: "success",
                user: result.Items[0],
            };
        }
        else
            return {
                status: "failed"
            };
    }
}

module.exports.SigninService = SigninService;
module.exports.service = new SigninService();


class LoginResponse{
    constructor(status, user){}
}