const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});
let mailOptions = {
  from: 'cosmose1904@gmail.com',
  to: "",
  subject: 'Boarding complete!',
  text: 'Hey, every member of your team is there!\nWe have booked a room for your Daily-Scrum!\nHave a nice day !\nThe CosmoseTeam.'
};

class SendMailService {
    constructor(){}
    
    sendMail(emails){
      console.log(emails);
      console.log(emails.length);
      emails.forEach(mail => {
        mailOptions.to = mail;
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        
      });
      
      return "Mail sended";
    }
    

  }
  
  module.exports.SendMailService = SendMailService;
  module.exports.service = new SendMailService();