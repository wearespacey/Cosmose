import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from 'src/app/models/LoginResponse';
import { SigninForm } from 'src/app/models/forms/SigninForm';
import { SignupForm } from 'src/app/models/forms/SignupForm';

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  ENP_BASE:string = "";
  constructor(private http:HttpClient) { }

  usersSignin(form:SigninForm):Observable<LoginResponse>{
    return this.http.get<LoginResponse>(`${this.ENP_BASE}/sign-in?login=${form.login}&password=${form.password}`);
  }

  usersSignup(form:SignupForm):Observable<any>{
    return this.http.post<any>(`${this.ENP_BASE}/sign-up`, form);
  }
}
