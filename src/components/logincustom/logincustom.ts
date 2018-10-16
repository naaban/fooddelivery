import { Component } from '@angular/core';
import { LoadingController, NavController, ToastController, NavParams } from 'ionic-angular';
import { NavigationContainer } from 'ionic-angular/umd/navigation/navigation-container';
import { HomePage } from '../../pages/home/home';
import { RegisterPage } from '../../pages/register/register';
import { AdminHomePage } from '../../pages/admin-home/admin-home';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { IonicStorageModule } from '@ionic/storage';
import { AppPreferences } from '@ionic-native/app-preferences';
import { LocationPickerPage } from '../../pages/location-picker/location-picker';
import {Storage}  from '@ionic/storage'

/**
 * Generated class for the LogincustomComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'logincustom',
  templateUrl: 'logincustom.html'
})

export class LogincustomComponent {
  params: FormGroup;
  login: any;
  text: string;
  loading: any;
  data: any;
  session: any;
  result: any;
  isAdmin: boolean;
  constructor(public loadingCtrl: LoadingController,public storage : Storage,public navParams : NavParams, public navCtrl: NavController, public toastCtrl: ToastController,
    public formBuilder: FormBuilder, public apiProvider: ApiProvider) {
    console.log('Hello LogincustomComponent Component');
    this.text = 'Hello World';
    this.params = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      pass: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])]
    })
     this.storage.get('login_det').then(d=>{
       if(d!=null){
        this.navCtrl.setRoot(HomePage)
       }
     })
  }
  pushPage() {

     if (this.login != null) {
       this.presentLoadingCustom()
       if (this.login == "customer") {
         let data = new FormData()
         data.append('email', this.params.value.username)
         data.append('password', this.params.value.pass)
         data.append('role' , this.login)
         console.log(this.params.value.username+"  "+this.params.value.password+"  "+this.login)
         this.apiProvider.postData(data, 'login.php').then(d => {
           this.result = d
           console.log(this.result);
           if (this.result.status == 1) {
             this.loading.dismiss();
             this.data = this.result.data
             this.isAdmin = false
             this.storage.set("login_det" , this.result.data);
             this.navCtrl.setRoot(LocationPickerPage,{"login" : this.isAdmin})
            // this.appPreferences.store("user_id" , this.data.user_id)
             //this.navCtrl.setRoot(HomePage)
           }
           else {
             console.log(this.result);
             this.loading.dismiss();
             this.presentToast('Incorrect Email Id or Password')
           }
         })
       }
       else if (this.login == "resturant") {
         let data = new FormData()
         data.append('email', this.params.value.username)
         data.append('password', this.params.value.pass)
         data.append('role' , this.login)
         this.apiProvider.postData(data, 'login.php').then(d => {
           this.result = d
           console.log(this.result);
           if (this.result.status == 1) {
             this.loading.dismiss();
             this.isAdmin = true
             this.storage.set("login_det" , this.result.data);
             this.navCtrl.setRoot(LocationPickerPage,{"login" : this.isAdmin})
           }
           else {
             console.log(this.result);
             this.loading.dismiss();
             this.presentToast('Incorrect Email Id or Password')
           }
         })
       }
     }
    else {
      this.presentToast('Please Choose login Type')
    }
  }
  register() {
    this.navCtrl.push(LocationPickerPage ,{"signup" : true});
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
           Signing in.. Please Wait..
         </ion-col>
       </ion-row>
       </div>`,
      duration: 500

    });

    this.loading.present();
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


}
