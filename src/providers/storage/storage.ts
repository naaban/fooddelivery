import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage'
/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public storage: Storage) {
    console.log('Hello StorageProvider Provider');
  }


  setLogin(userdet){
    console.log(userdet)
    this.storage.set('user_id' , userdet.user_id)
    this.storage.set('user_email' , userdet.user_email)
    this.storage.set('user_mobile' , userdet.user_mobile)
    this.storage.set('user_name' , userdet.user_name)
   
  }

  getLogin(){
    let userdet = {
      id: this.storage.get("user_id"),
      email: this.storage.get("user_email"),
      mobile:this.storage.get("user_mobile"),
      name:this.storage.get("user_name")
    }
    return userdet

  }
  remove(){
    this.storage.remove("user_id")
    this.storage.remove("user_mobile")
    this.storage.remove("user_email")
    this.storage.remove("user_name")
  }

}
