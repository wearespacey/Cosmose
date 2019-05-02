const AWS = require('aws-sdk');
const dynamoClient = new AWS.DynamoDB.DocumentClient();

class SignupService {
    constructor() {}

    addUser(login, email, password){
        var user;
        try{
            user = {
                Login: login,
                Mail: email,
                Password: password,
                Position: "In",
                Team: "Other"
            };

            dynamoClient.put({
                TableName: 'Rocket',
                Item: user,
            }).promise();
        }
        catch(ex){
            console.log(ex);
        }
        
        return user;
    }
}

module.exports.SignupService = SignupService;
module.exports.service = new SignupService();
