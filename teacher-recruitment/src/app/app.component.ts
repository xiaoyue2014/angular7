import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '港区教师招考报名系统';
  constructor() {
  }
ngOnInit() {

  }
  // //获取省市列表
  // getProvinceList(){
  //   this.httpService.getProvinceList()
  //   .subscribe(data => {
  //           this.provincelists = data['data'];
  //           console.log(this.provincelists);
  //           this.message.create('success', '获取省市信息成功！');
  //       },error => {
  //     		this.message.create('error', '获取省市信息失败！');
  //   	});
  // }
  // //弹出模态框
  // isVisible = false;

  // constructor() {}

  // showModal(): void {
  //   this.isVisible = true;
  // }

  // handleOk(): void {
  //   console.log('Button ok clicked!');
  //   this.isVisible = false;
  // }

  // handleCancel(): void {
  //   console.log('Button cancel clicked!');
  //   this.isVisible = false;
  // }
}
