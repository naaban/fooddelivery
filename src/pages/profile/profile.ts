import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
<<<<<<< HEAD
import {Storage} from '@ionic/storage'
=======
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  session: any;
  
<<<<<<< HEAD
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {


=======
  constructor(public navCtrl: NavController, public navParams: NavParams) {
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad ProfilePage');
  }

  logout(){
    this.navCtrl.setRoot(LoginPage)
  }
}
