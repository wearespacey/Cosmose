import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, LogoutComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
