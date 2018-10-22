import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ActionSheetController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';

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

  ads: any;
  res: any;
  base64Image : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider,public toastCtrl : ToastController, public actionSheetCtrl: ActionSheetController,public alertCtrl : AlertController,public base64 : Base64, public camera: Camera) {
    this.getAds()
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadAdsPage');
  }

  uploadAdsApi(base64Image){
    let data = new FormData()
    data.append('image' , base64Image)
    this.apiProvider.postData(data , 'upload_ads.php').then(d=>
      {
        if(this.res.status ==  1){
          this.presentToast("Ad Updated")
          this.getAds()
        }else{
          this.presentToast("something Went Error")
          this.getAds()
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
            this.deleteAd(event)
            console.log('Yes clicked');
          }
        }
      ]
    });
    alert.present();
  }
  getAds(){
    this.apiProvider.getData('list_ads.php').then(d=>{
      this.ads = d;
      console.log(this.ads.data)
      if(this.ads.status == 1){
        this.ads = this.ads.data
      }
    })
  }
  
  presentActionSheet(event) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify',
      buttons: [
        {
          text: 'Update Ad',
          role: 'update',
          handler: () => {
            this.updateAd(0,event)
            console.log('Archive clicked');
          }
        },
         {
          text: 'Delete Ad'  ,
          role: 'delete',
          handler: () => {
            this.delelteCnfrm(event)
            console.log('Archive clicked');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  updateAdApi(event,base64Image){
    let data = new FormData()
    data.append('image' ,  base64Image);
    data.append('id', event.id)
    this.apiProvider.postData(data , 'update_ad.php').then(d=>{
      let resp ;
      resp = d;
      if(resp.status == 1){
        this.presentToast("Ad updated successfully")
      }
      else this.presentToast("Something went wrong")
    })
  }
  deleteAd(event){
    let data = new FormData()
    data.append('id' , event.id)
    this.apiProvider.postData(data , 'delete_ad.php').then(d=>{
      let resp;
      resp= d;
      if(resp.status == 1){
        this.getAds()
        this.presentToast("Ad Deleted Successfully")
      }
      else { 
        this.getAds()
        this.presentToast("Something Went Error")
      }
    })
  }
  updateAd(sourceType: number , event) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.updateAdApi(event,base64Image)
    }, (err) => {
      // Handle error
      this.presentToast(err)
        console.log(err)
    });
  }
  uploadAds(sourceType: number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.uploadAdsApi(base64Image)
    }, (err) => {
      // Handle error
      this.presentToast(err)
        console.log(err)
    });
  }
}
