import { Component, OnInit} from '@angular/core';

export class AuthCode {
    private authCode:string;
    constructor() { }
   changeVerify(){
    let authCode = "";
    let authCodeLength = 4; //取几个随机数字
    let randomArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (let i = 0; i < authCodeLength; i++) {
        let index = Math.floor(Math.random() * 36); //随机取一位数
        authCode += randomArray[index]; //取四位数，并+相连
    }
    this.authCode=authCode; //赋值
   }
}
