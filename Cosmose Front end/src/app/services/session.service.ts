import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  public user:User;

  public getUser(){
    return this.user;
  }

  public setUser(user:User){
    this.user = user;
  }
}
