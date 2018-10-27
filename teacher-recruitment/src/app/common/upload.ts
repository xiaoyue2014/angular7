import { Component, Input, Inject } from '@angular/core';
import { NzMessageService, UploadFile, UploadFilter, UploadXHRArgs } from 'ng-zorro-antd';
import { HttpRequest, HttpClient, HttpEventType, HttpEvent, HttpResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { HttpService } from "./httpService";


@Component({
  selector: 'nz-demo-upload-picture-card',
  template: `
  <div class="clearfix">
    <nz-upload
      [nzAction]='urlConfig.url+"/storage/cloudservice/content/file/upload?responseType=json"'
      (nzChange)="handleChange($event)"
      nzListType="picture-card"
      [(nzFileList)]="fileList"
      [nzFilter]="filters"
      [nzShowButton]="fileList.length < 1"
      [nzRemove]="removeCover"
      [nzPreview]="handlePreview">
        <i class="anticon anticon-plus"></i>
        <div class="ant-upload-text">Upload</div>
    </nz-upload>
    <nz-modal [nzVisible]="previewVisible" [nzContent]="modalContent" [nzFooter]="null" (nzOnCancel)="previewVisible=false">
      <ng-template #modalContent>
        <img [src]="previewImage" [ngStyle]="{ 'width': '100%' }" />
      </ng-template>
    </nz-modal>
  </div>
  `,
  styles: [
    `
  :host ::ng-deep i {
    font-size: 32px;
    color: #999;
  }
  :host ::ng-deep .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  `
  ]
})
export class NzDemoUploadPictureCardComponent {
  fileList = [];
  previewImage = '';
  previewVisible = false;
  coverlist = [];
  constructor(private msg: NzMessageService,private httpService:HttpService,@Inject('urlConfig')private urlConfig) {
  	
  }
  ngOnInit(){
  	this.initcoverFn();//初始化图片
  }
  //初始化图片
  initcoverFn(){
  	this.fileList = []; //初始化清空图片
  	let covers_ = window.sessionStorage.getItem('EventStatusListCover');
  	if(covers_){
  		let list_ = JSON.parse(covers_);
  		for(let i in list_){
  			this.fileList.push({
	      'uid': list_[i].fileId,
	      'name': list_[i].fileName,
	      'status': 'done',
	      'url': list_[i].url
	    	});
  		}
  	}
  }
  //上传限制
  filters: UploadFilter[] = [
    {
      name: 'type',
      fn  : (fileList: UploadFile[]) => {
        const filterFiles = fileList.filter(w => ~['image/png','image/jpg','image/gif','image/bmp','image/jpeg'].indexOf(w.type));
        if (filterFiles.length !== fileList.length) {
          this.msg.create('error','上传文件格式不正确，只支持上传png、jpg、gif、bmp、jpeg格式哟!');
          return filterFiles;
        }
        return fileList;
      }
    }
  ];
  
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }
  removeCover = (file: UploadFile) => {
  	let coverfilelists = JSON.parse(window.sessionStorage.getItem('EventStatusListCover'));
  	for(let i in coverfilelists){
  		if(file.uid === coverfilelists[i].fileId || file.response['data'].id === coverfilelists[i].fileId){
  			this.httpService.removeFiles(coverfilelists[i].fileId)
	  			.subscribe(text => {
	              if (text.indexOf('<status>OK</status>')!=-1) {
	              	coverfilelists.splice(i,1); //去除第i条
					  			this.msg.create('success', '删除成功！');
					  			if (coverfilelists.length>0) { //如果长度大于1则存在
					  				window.sessionStorage.setItem('EventStatusListCover',JSON.stringify(coverfilelists));
					  			}else{ //否则直接清除对应的EventStatusListCover
					  				window.sessionStorage.removeItem('EventStatusListCover');
					  			}
					  			this.initcoverFn();//初始化图片
	              }
	          },error => {
			          this.msg.create('error', '网络错误请稍后再试');
			      });
  			break;
  		}
  	}
  	//return true;
  }
  handleChange(info: any): void {
  	this.coverlist = [];
    const fileList = info.fileList;
    // 2. read from response and show file link
    if (info.file.response) {
      info.file.url = info.file.response.url;
    }
    // 3. filter successfully uploaded files according to response from server
    this.fileList = fileList.filter(item => {
      if (item.response) {
      	let l_ = item.response['data'];
      	this.coverlist.push({
		      "description": l_.description,
		      "fileExt": "",
		      "fileId": l_.id,
		      "fileName": l_.name,
		      "fileOrder": 0,
		      "url": l_.downloadUrl
		    })
      	window.sessionStorage.setItem('EventStatusListCover',JSON.stringify(this.coverlist));
        return item.response.status === 'success';
      }
      return true;
    });
  }
}
@Component({
  selector: 'nz-demo-upload-basic',
  template: `
  <nz-upload
    [nzAction]='urlConfig.url+"/storage/cloudservice/content/file/upload?responseType=json"'
    (nzChange)="handleChange($event)"
    [(nzFileList)]="fileList"
    [nzFilter]="filters"
    [nzRemove]="removeFiles">
    <button nz-button>
      <i class="anticon anticon-upload"></i><span>上传</span>
    </button>
  </nz-upload>
  `
})
export class NzDemoUploadBasicComponent {
  fileList = [];
  files_ = [];
  constructor(private msg: NzMessageService, private httpService:HttpService,@Inject('urlConfig')private urlConfig) {
  	
  }
  ngOnInit() {
  	this.initFiles();//初始化文件列表
  }
  //初始化文件列表
  initFiles() {
  	let file_ = window.sessionStorage.getItem('EventStatusListFiles');
  	this.fileList = []; //初始化清空 二次调用
  	this.files_ = []; //初始化清空 二次调用
  	if(file_){
  		let list_ = JSON.parse(file_);
  		for(let i in list_){
  			//console.log(list_[i])
				this.files_.push({
					"contentId":list_[i].contentId,
		      "description": list_[i].description,
		      "extendAttrs": "",
		      "fileExt": "",
		      "fileId": list_[i].fileId,
		      "fileName": list_[i].fileName,
		      "fileOrder": list_[i].fileOrder,
		      "md5": list_[i].md5,
		      "size": list_[i].size,
		      "url": list_[i].url
		    });
  			this.fileList.push({
	      'uid': list_[i].fileId,
	      'name': list_[i].fileName,
	      'status': 'done',
	      'url': list_[i].url
	    	});
  		}
  	}
  }
  //上传限制
  filters: UploadFilter[] = [
    {
      name: 'type',
      fn  : (fileList: UploadFile[]) => {
        const filterFiles = fileList.filter(w => ~['application/mp4','application/doc','application/docx','application/ppt','application/pptx','application/pdf','application/mov'].indexOf(w.type));
        if (filterFiles.length !== fileList.length) {
          this.msg.create('error','上传文件格式不正确，只支持上传mp4、doc、docx、ppt、pptx、pdf、mov格式哟!');
          return filterFiles;
        }
        return fileList;
      }
    }
  ];
  
  handleChange(info: any): void {
    const fileList = info.fileList;
    // 2. read from response and show file link
    if (info.file.response) {
      info.file.url = info.file.response.url;
    }
    // 3. filter successfully uploaded files according to response from server
    this.fileList = fileList.filter(item => {
      if (item.response) {
        return item.response.status === 'success';
      }
      return true;
    });
    let n = this.files_.length; //上传之前的文件条数
    //上传成功以后执行的函数
    for(let i=n;i<fileList.length;i++){
    	if (fileList[i].response) {
	    	let l_ = fileList[i].response['data'];
				this.files_.push({
				      "description": l_.description,
				      "extendAttrs": "",
				      "fileExt": "",
				      "fileId": l_.id,
				      "fileName": l_.name,
				      "fileOrder": 0,
				      "md5": l_.md5,
				      "size": l_.size,
				      "url": l_.downloadUrl.replace(this.urlConfig.url,this.urlConfig.replaceUrl)
				    });
	    }
    }
    window.sessionStorage.setItem('EventStatusListFiles',JSON.stringify(this.files_)); //上传成功以后存储数据以便提交
    //this.msg.create('success', '文件成功上传!');
  }
  
  removeFiles = (file: UploadFile) => {
  	let that = this;
  	let filelists = JSON.parse(window.sessionStorage.getItem('EventStatusListFiles'));
  	for(let i in filelists){
  		if(file.uid && file.uid === filelists[i].fileId){ //如果删除的数据id与总数据中其中一条数据id一样则清除本条数据
  			console.log(filelists[i])
  			this.httpService.removeFiles(file.uid)
  				.subscribe(text => {
              if ((text.indexOf('<status>OK</status>')!=-1)) {
              	this.msg.create('success', '删除成功！');
		          	filelists.splice(i,1); //去除第i条
				  			if (filelists.length>0) { //如果长度大于1则存在
				  				window.sessionStorage.setItem('EventStatusListFiles',JSON.stringify(filelists));
				  			}else{ //否则直接清除对应的EventStatusListCover
				  				window.sessionStorage.removeItem('EventStatusListFiles');
				  			}
				  			this.initFiles();//初始化文件列表
              }
          },error => {
		          this.msg.create('error', '网络错误请稍后再试');
		      });
	  			break;
  		}
  		if(file.response && file.response['data'].id === filelists[i].fileId){
  				this.httpService.removeFiles(file.response['data'].id)
  				.subscribe(text => {
              if ((text.indexOf('<status>OK</status>')!=-1)) {
              	filelists.splice(i,1); //去除第i条
				  			if (filelists.length>0) { //如果长度大于1则存在
				  				window.sessionStorage.setItem('EventStatusListFiles',JSON.stringify(filelists));
				  			}else{ //否则直接清除对应的EventStatusListCover
				  				window.sessionStorage.removeItem('EventStatusListFiles');
				  			}
				  			this.initFiles();//初始化文件列表
              }
          },error => {
		          this.msg.create('error', '网络错误请稍后再试');
		      });
  			break;
  		}
  	}
  }
}
