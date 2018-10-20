import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { LoginPage } from '../login/login';
import { ApprovedPage } from '../approved/approved';
import { UnapprovedPage } from '../unapproved/unapproved';
import { UploadAdsPage } from '../upload-ads/upload-ads';

/**
 * Generated class for the SuAdminHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-su-admin-home',
  templateUrl: 'su-admin-home.html',
})
export class SuAdminHomePage {

  offers: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage : Storage) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferPage');
  }
  logout(){
    this.storage.clear()
    this.navCtrl.setRoot(LoginPage)
    
  }
  approved(){
    this.navCtrl.push(ApprovedPage);
  }
  unapproved(){
    this.navCtrl.push(UnapprovedPage);
  }
  listAds(){
    this.navCtrl.push(UploadAdsPage)
  }

}
