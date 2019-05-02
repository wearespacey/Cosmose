import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AwsService } from 'src/app/services/aws/aws.service';
import { SigninForm } from 'src/app/models/forms/SigninForm';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'protractor';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class LoginComponent implements OnInit {

  constructor(public enpService:AwsService, public sessionService:SessionService, private router:Router) { }

  login:string;
  password:string;
  isFlying:boolean = false;

  ngOnInit() {

  }

  verify(){
    var form:SigninForm = {
      login: this.login,
      password: this.password
    }
    
    this.enpService.usersSignin(form).subscribe(res=>{
      if(res.status == "success"){
        localStorage.setItem("USER", JSON.stringify(res.user));
        this.sessionService.user = res.user;
        this.isFlying = true;
        setTimeout(() => {
          this.router.navigate(["/dashboard"]);
        }, 2000);
      }else{

      }
    },err=>{
      console.log(err);
    });
  }

}
