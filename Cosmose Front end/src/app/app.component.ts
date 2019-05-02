import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from './models/User';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  constructor(public sessionService:SessionService){}

  title = 'Cosmos';

  ngOnInit() {
  }
}


