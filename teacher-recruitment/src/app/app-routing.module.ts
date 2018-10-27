import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindBackPwdComponent } from './find-back-pwd/find-back-pwd.component';
import { FindBackPwd2Component } from './find-back-pwd2/find-back-pwd2.component';
import { FindBackPwd3Component } from './find-back-pwd3/find-back-pwd3.component';
import { HomeComponent } from './home/home.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { MyCollectsComponent } from './my-collects/my-collects.component';
import { LoginRegisterComponent } from './login-register/login-register.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'password', component: FindBackPwdComponent },
  { path: 'step2', component: FindBackPwd2Component },
  { path: 'step3', component: FindBackPwd3Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
