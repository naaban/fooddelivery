import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {Storage} from '@ionic/storage'
import { CameraOptions, Camera } from '@ionic-native/camera';
import { FormBuilder } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { Base64 } from '@ionic-native/base64';

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
  result: any;
  profile_image : any = "../../assets/imgs/profile.svg";
  base64Image : any;
  wallet: any = {
    amount : 0
  };
  
  constructor(public navCtrl: NavController,public navParams: NavParams, public storage: Storage,public toastCtrl: ToastController, public camera: Camera , public formBuilder : FormBuilder,public apiProvider:ApiProvider,public base64 : Base64) {
    this.getWalletAmt()
    console.log(this.wallet);
    this.session = this.storage.get("login_det").then(d=>{
      this.session = d
      console.log(d)

    })


  }
  getWalletAmt(){
    let data = new FormData();
    data.append('customer_id' , '1');
    this.apiProvider.postData(data , 'wallet.php').then(d=>{
      this.wallet = d;
      console.log(d)
      if(this.wallet.status == 1){
        this.wallet = this.wallet.data
        console.log(this.wallet)     
       }
    })
  }
  ionViewDidLoad() {
    
    console.log('ionViewDidLoad ProfilePage');
  }

  logout(){
    this.storage.clear();
    this.navCtrl.setRoot(LoginPage)
  }
  presentToast(data) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
 
}
