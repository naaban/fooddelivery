import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the UploadAdsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-ads',
  templateUrl: 'upload-ads.html',
})
export class UploadAdsPage {

  offers: any;
  res: any;
  base64Image : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider,public toastCtrl : ToastController, public alertCtrl : AlertController) {
    this.offers = [{
      image: "../../assets/imgs/offer1.jpg"
    },
    {
      image: "../../assets/imgs/offer2.jpg"
    },
    {
      image: "../../assets/imgs/offer3.jpg"
    },
    {
      image: "../../assets/imgs/offer4.jpg"
    },
    {
      image: "../../assets/imgs/food5.jpg"
    }]
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadAdsPage');
  }
  uploadAds(){
    let data = new FormData()
    data.append('image' , this.base64Image )
    this.apiProvider.postData(data , 'upload_ads.php').then(d=>
      {
        if(this.res.status ==  1){
          this.presentToast("Ad Updated")
        }else{
          this.presentToast("something Went Error")
        }
      })
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
  delivered(result) {
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
            console.log('Yes clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
