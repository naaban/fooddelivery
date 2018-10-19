import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { LoginPage } from '../login/login';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage : Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuAdminHomePage');
  }
  logout(){
    this.storage.clear()
    this.navCtrl.setRoot(LoginPage)
    
  }

}
