import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router} from '@angular/router'; //导入router服务

@Component({
  selector: 'app-find-back-pwd3',
  templateUrl: './find-back-pwd3.component.html',
  styleUrls: ['./find-back-pwd3.component.scss']
})
export class FindBackPwd3Component implements OnInit {
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

  confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: FormBuilder,private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      password         : [ null, [ Validators.required ] ],
      checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
    });
  }
   //跳转到登录页
   goToLogin(){
     this.router.navigateByUrl("login"); //跳转至登录页
   }
}

