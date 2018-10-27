import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

//需加token的请求
let seturlLists = [
			"/microservice/signup/reviewTask/count",/*获取评审作品总条数*/
			"/microservice/signup/reviewTask/query",/*获取评审作品列表*/
			"/microservice/signup/progressInfo/query",/*获取评审信息*/
			"/microservice/signup/reviewInfo/add",/*提交评审结果*/
			"/microservice/signup/comment/add",/*添加评论*/
			"/microservice/signup/v2.0/answer/queryByUser",/*获取我的作品列表*/
			"/microservice/signup/v2.0/answer/countByUser",/*获取我的作品列表总数*/
			"/microservice/signup/favorite/query",/*获取收藏列表*/
			"/microservice/signup/favorite/count",/*获取收藏列表总数*/
			"/microservice/signup/favorite/add",/*收藏作品*/
			"/microservice/signup/favorite/remove",/*作品取消收藏*/
			"/microservice/signup/favorite/get",/*查询个人是否收藏*/
			"/microservice/signup/publishment/get", /*查询报名参赛表单字段*/
			"/microservice/signup/v2.0/answer/submit",/*提交报名表单step1*/
			"/microservice/content/add", /*表单提交第二步*/
			"/microservice/signup/v2.0/answer/edit", /*编辑提交报名表单step2*/
			"/microservice/signup/contestPublishment/query",/*查询参赛状态*/
			"/microservice/signup/auditInfo/add",/*参赛*/
			"/microservice/signup/answer/remove",/*删除参赛状态中单个作品*/
			"/microservice/signup/answer/query",/*查询答案*/
			"/microservice/content/get", /*查询作品封面及附件信息*/
			"/storage/cloudservice/content/file/upload", /*文件上传*/
			"/microservice/content/remove/", /*删除contentId下面的所有资源*/
			"/storagemgr/cloudservice/content/file/delete.so", /*文件删除*/
			"/microservice/signup/quotaInfo/query",/*获取评分细则*/
			'/microservice/signup/scoreInfo/add',/*添加评分细则*/
			'/microservice/signup/userInfo/query', /*查询是否存在学校信息*/
			'/microservice/signup/userInfo/update' /*补充提交省市学校信息*/
		]

@Injectable()
export class Interceptor implements HttpInterceptor {
	constructor(private cookieService: CookieService){}
  	intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	  	let authReq = req;
	  	for(let i in seturlLists){
	  		if (req.url.indexOf(seturlLists[i])!=-1) {
	  			authReq = req.clone({
			      headers: req.headers.set('accessToken',this.cookieService.get('saishipingtaiaccessToken'))
			    });
			    //console.log(true)
	  		}
	  	}
	  	return next.handle(authReq);
  	}
}