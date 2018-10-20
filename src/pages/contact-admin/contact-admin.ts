import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ContactAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-admin',
  templateUrl: 'contact-admin.html',
})
export class ContactAdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage : Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactAdminPage');
  }
  logout(){
    this.storage.clear()
    this.navCtrl.setRoot(LoginPage)
  }

}
