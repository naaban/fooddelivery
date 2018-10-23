import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ApiProvider } from '../../providers/api/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Storage} from '@ionic/storage'
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  login: any;
  params: FormGroup;
  result: any;
  location: any;
  loading : any;
  loc : any;
  constructor(public navCtrl: NavController, public geolocation : Geolocation,public nativeGeocoder : NativeGeocoder,public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public apiProvider: ApiProvider, public formBuilder: FormBuilder,public storage : Storage ) {
    this.params = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      pass: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      confirm: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])],
      fullname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(8), Validators.maxLength(30)])]
    })
    this.storage.get("location").then(d=>{
      this.location = d;
    })
  
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
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

    this.loading.present();
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
  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp)
      this.getGeoCoder(resp.coords.latitude, resp.coords.longitude)
    }).catch((error) => {

      console.log('Error getting location', error);
    });
  }
  getGeoCoder(lat, lon) {
    this.presentLoadingCustom()
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(lat, lon, options)
      .then((result: NativeGeocoderReverseResult[]) => this.storage.set("location" , result[0]))
      .catch((error: any) => console.log(error));
  }
  register() {
    this.getLocation()
    if (this.params.valid) {
      if (this.login != null) {
        if (this.login == 'customer') {
          let data = new FormData();
          data.append('role', this.login)
          data.append('mobile', this.params.value.mobile)
          data.append('name', this.params.value.fullname)
          data.append('email', this.params.value.username)
          data.append('password', this.params.value.pass)
          this.apiProvider.postData(data, 'register.php').then(d => {
            this.result = d
            console.log(this.result)
            if (this.result.status == 1) {
              this.loading.dismiss()
              this.navCtrl.setRoot(LoginPage)
              this.presentToast('Successfully Registered Please Login')
            }
            
            else if (this.result.status == 2) { 
              this.presentToast('User Already Exists.. Please Login');
               this.navCtrl.setRoot(LoginPage) 
              this.loading.dismiss()
            }
            else
              this.presentToast('Incorrect Email or Password')
          })
        }
        else if (this.login == 'resturant') {
          this.storage.get("location").then(d=>{
            let data = new FormData();
            data.append('role', this.login)
            data.append('mobile', this.params.value.mobile)
            data.append('name', this.params.value.fullname)
            data.append('email', this.params.value.username)
            data.append('password', this.params.value.pass)
            data.append('city' , d.locality)
            data.append('state' , d.administrativeArea)
            this.apiProvider.postData(data, 'register.php').then(d => {
              this.result = d
              console.log(this.result)
              if (this.result.status == 1) {
                this.loading.dismiss()
                this.navCtrl.setRoot(LoginPage)
                this.presentToast('Successfully Registered Please Login')
              }
              else if (this.result.status == 2) { 
                  this.loading.dismiss()
                  this.presentToast('User Already Exists.. Please Login'); 
                  this.navCtrl.setRoot(LoginPage) 
              }
              else
                this.presentToast('Incorrect Email or Password')
            })
          })
        }
      }
      else {
        this.presentToast('Please Select Register Type')
      }
    }
  }
}
