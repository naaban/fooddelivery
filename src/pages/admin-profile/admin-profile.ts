import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
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
  uploadImage: boolean;
  profile_image: any = {
    image :"../../assets/imgs/profile.svg"
  };
  base64Image: any;
  offers: any;
  resp: any ;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public storage: Storage, public toastCtrl: ToastController, public camera: Camera, public formBuilder: FormBuilder, public apiProvider: ApiProvider, public base64: Base64) {
    this.session = this.storage.get("login_det").then(d => {
      this.session = d
      console.log(d)
    })
    this.uploadImage = true
    this.getImage()
    this.listOffer()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProfilePage');
  }
  uploadProfile() {
    console.log()
    this.takePhoto(0)
  }
  logout() {
    this.storage.clear()
    this.navCtrl.setRoot(LoginPage)
  }

  getImage() {
    this.storage.get("login_det").then(log_data => {
      let data = new FormData()
      data.append('id', log_data.user_id)
      data.append('role', 'resturant')
      this.apiProvider.postData(data, 'get_profile_pic.php').then(d => {
        console.log(d)
        this.resp = d;
        if (this.resp.status == 1) {
          console.log(this.resp.data)
          this.resp = this.resp.data;
        }
        else{
          this.resp = "../../assets/imgs/profile.svg";
        }
      })
    });


  }
  takePhoto(sourceType: number) {

    this.uploadImage = true;
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
      data.append('image', this.base64Image);
      this.storage.get("login_det").then(d => {
        data.append('customer_id', d.user_id)
        this.apiProvider.postData(data, 'upload_picture.php').then(d => {
          this.result = d
          if (this.result.status == 1) {
            this.getImage()
            this.presentToast("Profile Picture Updated")
          }
          else {
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

  listOffer() {
    this.storage.get("login_det").then(log_data => {
      let data = new FormData()
      console.log(this.session)
      data.append('admin_id', log_data.user_id);
      this.apiProvider.postData(data, 'list_offer.php').then(d => {
        this.offers = d;
        console.log(this.offers)
        if (this.offers.status == 1) {
          this.offers = this.offers.data
          console.log(this.offers)
        }
      })
    })
  }
  delelteCnfrm(event) {
    let alert = this.alertCtrl.create({
      title: 'Are you sure ?',
      message: 'Delete Ad',
      buttons: [
        {
          text: 'No',
          role: 'no',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let data = new FormData()
            data.append('admin_id', this.session.admin_id)
            data.append('id', event.id)
            this.apiProvider.postData(data, 'delete_offer.php').then(d => {
              let resp;
              resp = d;
              if (resp.status == 1) {
                this.presentToast("Offer Deleted")
              }
              else this.presentToast("Something went error")
            })
            console.log('Yes clicked');
          }
        }
      ]
    });
  }
  uploadOffer(sourceType: number) {

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
      data.append('image', this.base64Image);
      this.storage.get("login_det").then(d => {
        data.append('admin_id', d.user_id)
        this.apiProvider.postData(data, 'add_offer.php').then(d => {
          this.result = d
          if (this.result.status == 1) {
            this.presentToast("Profile Picture Updated")
            this.listOffer()
          }
          else {
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
}
