import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { Base64 } from '@ionic-native/base64';
import { LoginPage } from '../login/login';

/**
 * Generated class for the AdminProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-profile',
  templateUrl: 'admin-profile.html',
})
export class AdminProfilePage {
  session: any;
  result: any;
  profile_image : any = "../../assets/imgs/profile.svg";
  base64Image : any;
  constructor(public navCtrl: NavController,public navParams: NavParams, public storage: Storage,public toastCtrl: ToastController, public camera: Camera , public formBuilder : FormBuilder,public apiProvider:ApiProvider,public base64 : Base64) {
    this.session = this.storage.get("login_det").then(d => {
      this.session = d
      if(this.session.image !=null) this.profile_image = this.session.image
      console.log(d)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProfilePage');
  }

  uploadProfile(){
    console.log()
    this.takePhoto(0)
  }
  logout() {
    this.storage.clear()
    this.navCtrl.setRoot(LoginPage)
  }
  takePhoto(sourceType: number) {
   
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      let data = new FormData();
      data.append('image' , this.base64Image);
      this.storage.get("login_det").then(d=>{
      data.append('customer_id' ,d.user_id)
      this.apiProvider.postData(data,'upload_picture.php').then(d=>{
        this.result = d
        if(this.result.status == 1){
          this.presentToast("Profile Picture Updated")
        }
        else{
          this.presentToast("NetWork Error")
        }
      })
    })
    }, (err) => {
      this.profile_image = "../../assets/imgs/profile.svg"
      // Handle error
      this.presentToast(err)
        console.log(err)
    });
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
