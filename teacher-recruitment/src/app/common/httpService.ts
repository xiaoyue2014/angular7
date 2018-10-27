import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

@Injectable()
export class HttpService {
    constructor(private http: HttpClient,@Inject('urlConfig')private urlConfig) { 
    	
    }
    /*获取省市列表*/
    getProvinceList(){
        return this.http.get(this.urlConfig.url + "/microservice/school/v2.0/province/query")
    }
    /*重新获取token*/
    getToken(param:any) {
    	return this.http.get(this.urlConfig.url +'/oauth2/oauth/token?client_id=wiedu_application_key&client_secret=wiedu_application_secret&grant_type=authorization_code&code='+param+"&redirect_uri="+this.urlConfig.redirectUrl)
    }
    /*重新获取token*/
    resetToken(param:any) {
    	return this.http.get(this.urlConfig.url +'/oauth2/oauth/token?client_id=wiedu_application_key&client_secret=wiedu_application_secret&grant_type=refresh_token&refresh_token='+param)
    }
    /*获取赛事列表*/
    getEventList(param:any) {
        return this.http.post(this.urlConfig.url+'/microservice/signup/contestInfo/queryByPublish',param)
    }
    /*查询赛事详情*/
    getEventInfo(param:any) {
      return this.http.get(this.urlConfig.url +'/microservice/signup/contestInfo/get?eventId='+param)
    }
    /*获取评审作品总条数*/
    getworkTotal(param:any) {
    	return this.http.post(this.urlConfig.url +'/microservice/signup/reviewTask/count',param)
    }
    /*获取评审作品列表*/
    getCommentWorkList(param:any) {
    	return this.http.post(this.urlConfig.url +'/microservice/signup/reviewTask/query',param)
    }
    /*获取作品详情*/
    getWorkInfo(param:any) {
    	return this.http.get(this.urlConfig.url +'/microservice/signup/v2.0/answer/get?activityId='+param)
    }
    /*获取评审信息*/
    getCommentWorkInfo(param:any) {
    	return this.http.post(this.urlConfig.url +'/microservice/signup/progressInfo/query',param)
    }
    /*提交评审结果*/
    pullCommentResult(param:any) {
    	return this.http.post(this.urlConfig.url +'/microservice/signup/reviewInfo/add',param)
    }
    /*注册*/
    register(param:any){
        return this.http.post(this.urlConfig.url +'/microservice/signup/userInfo/add',param)
    }
    /*登录*/
    login(username, password){
        return this.http.get(this.urlConfig.url +'/oauth2/oauth/token?client_id=wiedu_application_key&client_secret=wiedu_application_secret&grant_type=password&username='+username+"&password="+password+'&encryption=md5')
    }
    login2(param:any) {
        return this.http.get(this.urlConfig.url +'/microservice/account/token/'+param)
    }
    /*获取获奖作品列表*/
   	getAwardsList(param:any) {
   		return this.http.post(this.urlConfig.url +'/microservice/signup/prizeInfo/queryByShow',param)
   	}
   	/*获取获奖作品列表总条数*/
   	getAwardsTotals(param:any) {
   		return this.http.post(this.urlConfig.url +'/microservice/signup/prizeInfo/count',param)
   	}
   	/*获取获奖作品详情*/
   	getAwardsWorkInfo(activityId) {
   		return this.http.get(this.urlConfig.url +'/microservice/signup/prizeInfo/get?activityId='+activityId)
   	}
    /*添加评论*/
    pulldiscuss(param:any) {
    	return this.http.post(this.urlConfig.url +'/microservice/signup/comment/add',param)
    }
    /*获取评论列表*/
   	getDiscussList(param:any) {
    	return this.http.post(this.urlConfig.url +'/microservice/signup/comment/query',param)
    }
   	/*获取当前作品评论总条数*/
   	getDiscussTotals(param:any){
   		return this.http.post(this.urlConfig.url +'/microservice/signup/comment/count',param)
   	}
     /*获取我的作品列表*/
     getMyOpusList(param:any) {
        return this.http.post(this.urlConfig.url +'/microservice/signup/v2.0/answer/queryByUser',param)
     }
    /*获取我的作品列表总数*/
    getMyOpusTotal(param:any) {
        return this.http.post(this.urlConfig.url +'/microservice/signup/v2.0/answer/countByUser',param)
     }
   	/*获取收藏列表*/
   	getCollectList(param:any) {
   	   return this.http.post(this.urlConfig.url +'/microservice/signup/favorite/query',param)
   	}
    /*获取收藏列表总数*/
    getCollectTotal(param:any) {
        return this.http.post(this.urlConfig.url +'/microservice/signup/favorite/count',param)
     }
   	/*收藏作品*/
   	addcollect(param:any) {
   		return this.http.post(this.urlConfig.url +'/microservice/signup/favorite/add',param)
   	}
   	/*作品取消收藏*/
   	removecollect(activityId,userId) {
   		return this.http.delete(this.urlConfig.url +'/microservice/signup/favorite/remove?activityId='+activityId+'&userId='+userId)
   	}
   	/*作品收藏总次数*/
   	addcollectTotals(activityId) {
   		return this.http.get(this.urlConfig.url +'/microservice/signup/favorite/getCount?activityId='+activityId)
   	}
   	/*查询个人是否收藏*/
   	checkisFalseCollect(activityId,userId) {
   		return this.http.get(this.urlConfig.url +'/microservice/signup/favorite/get?activityId='+activityId+'&userId='+userId)
   	}
    /*查询报名参赛表单字段*/
     getItems(activityId) {
       return this.http.get(this.urlConfig.url +'/microservice/signup/publishment/get?activityId='+activityId)
     }
     /*提交报名表单step1*/
     addStep1(param:any) {
       return this.http.post(this.urlConfig.url +'/microservice/signup/v2.0/answer/submit',param)
     }
     /*提交报名表单step2*/
     addStep2(param:any) {
       return this.http.post(this.urlConfig.url +'/microservice/content/add',param)
     }
     /*编辑提交报名表单step2*/
     addStep2Answer(param:any) {
       return this.http.post(this.urlConfig.url +'/microservice/signup/v2.0/answer/edit',param)
     }
     /*查询参赛状态*/
     getStatusList(param:any) {
       return this.http.post(this.urlConfig.url +'/microservice/signup/contestPublishment/query',param)
     }
     /*参赛*/
     addStatus(param:any) {
       return this.http.get(this.urlConfig.url +'/microservice/signup/auditInfo/add?activityId='+param)
     }
     /*删除参赛状态中单个作品*/
    removeStatusSingeList(param:any) {
	    return this.http.get(this.urlConfig.url +'/microservice/signup/answer/remove?activityId='+param)
    }
    /*查询答案*/
    getAnswers(userId,activityId,parentActivityId) {
      	return this.http.get(this.urlConfig.url +'/microservice/signup/answer/query?userId='+userId+'&activityId='+activityId+'&parentActivityId='+parentActivityId)
    }
    /*查询作品封面及附件信息*/
   	getCoverFiles(param){
   		return this.http.get(this.urlConfig.url +'/microservice/content/get?contentId='+param)
   	}
   	/*删除contentId下面的所有资源*/
   	removeContentId(param){
   		return this.http.post(this.urlConfig.url +'/microservice/content/remove/'+param,{})
   	}
   	/*删除文件信息*/
   	removeFiles(param){
   		return this.http.get(this.urlConfig.url +'/storagemgr/cloudservice/content/file/delete.so?uuidList='+param,{responseType: "text"})
   	}
    /*获取评分细则*/
    getScoresDetail(eventId,typeCode){
       return this.http.get(this.urlConfig.url+'/microservice/signup/quotaInfo/query?eventId='+eventId+'&typeCode='+typeCode);
    }
    /*添加评分细则*/
    addScoresDetail(param){
       return this.http.post(this.urlConfig.url +'/microservice/signup/scoreInfo/add',param)
    }
    /*查询是否存在学校信息*/
    checkSchoolInfo(param){
    	return this.http.get(this.urlConfig.url +'/microservice/signup/userInfo/query?userId='+param)
    }
    /*补充提交省市学校信息*/
    putSchoolInfo(param) {
    	return this.http.post(this.urlConfig.url +'/microservice/signup/userInfo/update',param)
    }
}