import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
private p_index:number=0;
  constructor() { }

  ngOnInit() {
  }
getData(event){
  this.p_index=event;
}
}
