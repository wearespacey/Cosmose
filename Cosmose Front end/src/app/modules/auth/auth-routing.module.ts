import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"register", component:SignupComponent},
  {path:"logout", component:LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
