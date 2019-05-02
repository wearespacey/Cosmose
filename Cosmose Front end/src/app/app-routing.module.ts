import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren : "./modules/dashboard/dashboard.module#DashboardModule"
  },
  {
    path: "auth",
    loadChildren : "./modules/auth/auth.module#AuthModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
