import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the ApprovedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-approved',
  templateUrl: 'approved.html',
})
export class ApprovedPage {

  res : any;
  approved : any
  constructor(public navCtrl: NavController, public toastCtrl : ToastController,public apiProvider: ApiProvider,public navParams: NavParams) {
    this.getRestAdmins()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ApprovedPage');
  }

  getRestAdmins(){
    this.apiProvider.getData('approved_rest.php').then(d=>{
      this.res = d
      console.log(this.res)
      if(this.res.status == 1){
        this.res = this.res.data;
        this.approved = this.res[0].approved;
        console.log(this.approved)
      }
    })
  }

  unapprove(result){
    console.log(result.id);
    let res
    let data = new FormData();
    data.append('id' , result.id)
    this.apiProvider.postData(data, 'unapprove_rest.php').then(d=>{
        res = d
        console.log(res)
        if(res.status == 1){
          this.presentToast("Resturant Disapproved")
          this.getRestAdmins()
        }
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




}
