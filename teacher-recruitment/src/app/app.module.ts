import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS} from "@angular/common/http";  /*数据请求模块*/
import { NgZorroAntdModule, NZ_I18N, zh_CN,NZ_MESSAGE_CONFIG,NZ_MODAL_CONFIG } from 'ng-zorro-antd';

/*自定义服务*/
import { HttpService } from "./common/httpService";
import { AuthCode } from "./common/AuthCode";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Interceptor } from './auth.interceptor';//路由拦截
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';/*FormsModule表单模块*/

/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FindBackPwdComponent } from './find-back-pwd/find-back-pwd.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { MyCollectsComponent } from './my-collects/my-collects.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { FindBackPwd2Component } from './find-back-pwd2/find-back-pwd2.component';
import { FindBackPwd3Component } from './find-back-pwd3/find-back-pwd3.component';
import { StepsComponent } from './steps/steps.component';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FindBackPwdComponent,
    HomeComponent,
    MenuComponent,
    JobDetailsComponent,
    MyCollectsComponent,
    LoginRegisterComponent,
    FindBackPwd2Component,
    FindBackPwd3Component,
    StepsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule
  ],
  providers: [
    HttpService,
    AuthCode,
    CookieService,
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_MESSAGE_CONFIG, useValue: {nzDuration: 3000,nzMaxStack: 1,nzPauseOnHover: true,nzAnimate: true}},
    { provide: NZ_MODAL_CONFIG, useValue: { autoBodyPadding: false }},
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
    { provide: 'urlConfig', useValue: {url: 'http://cdzh.enable-ets.com:9999'}}, //学创杯正式环境
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
