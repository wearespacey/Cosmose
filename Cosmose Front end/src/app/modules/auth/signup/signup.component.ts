import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AwsService } from 'src/app/services/aws/aws.service';
import { SignupForm } from 'src/app/models/forms/SignupForm';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class SignupComponent implements OnInit {

  constructor(private enpService:AwsService) { }

  isRegistered:boolean = false;

  login:string;
  pass:string;
  mail:string;

  ngOnInit() {
  }

  register(){
    var form:SignupForm = {
      email: this.mail,
      password: this.pass,
      login: this.login
    }
    
    this.enpService.usersSignup(form).subscribe(res=>{
      this.isRegistered = true;
    });
  }

}
