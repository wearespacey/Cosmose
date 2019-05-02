import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  events;
  user:User;
  isLoaded:boolean = false;

  constructor(private session:SessionService, private httpClient:HttpClient) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem("USER"));
    if(user != null)
      this.user = user;

    this.getEvents();
  }

  getEvents(){
    this.httpClient.get(``).subscribe(res=>{
      this.events = res;
      this.isLoaded = true;
    })
  }

  getTeamInfos(){

  }

  swapOption(){
    document.getElementsByClassName("active")[0].classList.toggle("active");
  }

}
