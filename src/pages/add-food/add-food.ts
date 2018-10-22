import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ActionSheetController } from 'ionic-angular';
import { AdminHomePage } from '../admin-home/admin-home';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { Base64 } from '@ionic-native/base64';


/**
 * Generated class for the AddFoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-food',
  templateUrl: 'add-food.html',
})
export class AddFoodPage {
  params: FormGroup;
  loading: any;
  results: any;
  base64Image: any;
  splOffer: any;
  hideBtn: boolean;
  admin_id: any;
  image: any;
  prod_type: any;
  login: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController , public formBuilder : FormBuilder,public apiProvider:ApiProvider,public base64 : Base64, public camera: Camera) {

    this.params = this.formBuilder.group({
      foodname:  [''],
      fooddescription: [''],
      price: [''],
      qty: ['']
    })
    this.hideBtn = false
    this.admin_id = 1;
    this.getProductType();
  }
  getProductType(){
    this.apiProvider.getData('product_type.php').then(d=>{
      this.prod_type = d 
      this.prod_type = this.prod_type.data
      console.log(this.prod_type)   
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFoodPage');
  }
  pushPage() {
    this.presentLoadingCustom();
    console.log(this.login)
    console.log(this.splOffer)
  }
  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div >
       <ion-row class="loadingBar">
         <ion-col>
         <img class="image" src="../../assets/imgs/loginlogo.svg" alt="" width="120" height="120">
         </ion-col>
         <ion-col style="color:#000">
           Signing up.. Please Wait..
         </ion-col>
       </ion-row>
       </div>`,
    });
    loading.present();
    let data = new FormData()
    data.append('image' , this.base64Image)
    data.append('product_type' , "1")
    data.append('admin_id', "1")
    data.append('name' , this.params.value.foodname)
    data.append('des',this.params.value.fooddescription)
    data.append('price' , this.params.value.price)
    data.append('qty_avail',this.params.value.qty)
    console.log(data)
    this.apiProvider.postData(data , 'addfood.php').then(d=>{
      this.results =d
      if(this.results.status == 1){ 
        this.presentToast('Food Updated')
        loading.dismiss()
      }
    },(err)=>{
      this.presentToast(err)
      this.loading.dismiss()
    })
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
      this.hideBtn = true
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.base64.encodeFile(imageData).then((finalImage: string) =>{
        this.image = finalImage;
      },(err)=>{
        this.presentToast(this.image)
        console.log(err)
      })
    }, (err) => {
      // Handle error
      this.presentToast(err)
        console.log(err)
    });
  }
}
