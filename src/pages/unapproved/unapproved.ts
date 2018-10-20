import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the UnapprovedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unapproved',
  templateUrl: 'unapproved.html',
})
export class UnapprovedPage {

  res : any;
  unapproved : any;
  constructor(public navCtrl: NavController,public apiProvider : ApiProvider , public toastCtrl : ToastController, public navParams: NavParams) {
    this.getRestAdmins()
  }

  getRestAdmins(){
    this.apiProvider.getData('approved_rest.php').then(d=>{
      this.res = d
      console.log(this.res)
      if(this.res.status == 1){
        this.res = this.res.data;
        this.unapproved = this.res[1].unapproved;
        console.log(this.unapproved)
      }
    })
  }

  approve(result){
    console.log(result.id);
    let res
    let data = new FormData();
    data.append('id' , result.id)
    this.apiProvider.postData(data, 'approve_rest.php').then(d=>{
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
