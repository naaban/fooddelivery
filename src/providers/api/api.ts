import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  adminUrl = "http://yourchoiz.com/fd/food/";

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  postData(data,urlEnd){
    return new Promise((res)=>{
      console.log(this.adminUrl)
      this.http.post(this.adminUrl + urlEnd,data).subscribe(data=>{
        res(data)
      },err=>{
        console.log(err)
      })  
    })
  }
  getData(urlEnd){
    return new Promise((res)=>{
      this.http.get(this.adminUrl + urlEnd).subscribe(data=>{
        res(data)
      },err=>{
        console.log(err)
      })
    })
  }
  
}
