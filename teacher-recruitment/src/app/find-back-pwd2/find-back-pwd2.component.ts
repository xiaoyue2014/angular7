import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthCode } from '../common/AuthCode';
import { Router} from '@angular/router'; //导入router服务

@Component({
  selector: 'app-find-back-pwd2',
  templateUrl: './find-back-pwd2.component.html',
  styleUrls: ['./find-back-pwd2.component.scss']
})
export class FindBackPwd2Component implements OnInit {
validateForm: FormGroup;
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: FormBuilder,private authCode:AuthCode,private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      captcha      : [ null, [ Validators.required ] ],
      captcha2          : [ null, [ Validators.required ] ]
    });
    this.changeVerify();
  }
  //切换验证码
   changeVerify(){
     this.authCode.changeVerify();
   }
   //跳转到第二步
   goToStep3(){
     this.router.navigateByUrl("step3"); //跳转至第二步
   }
}

