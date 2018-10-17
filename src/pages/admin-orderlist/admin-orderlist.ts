import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage} from '@ionic/storage'

/**
 * Generated class for the AdminOrderlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-orderlist',
  templateUrl: 'admin-orderlist.html',
})
export class AdminOrderlistPage {

  results: any;
  confirm: boolean;
  res : any;
  loading : any;

  constructor(public navCtrl: NavController,public loadingCtrl : LoadingController,public toastCtrl: ToastController, public apiProvider: ApiProvider, public navParams: NavParams, public alertCtrl: AlertController,public storage : Storage) {

    this.getProducts()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminOrderlistPage');
  }

  getProducts() {
    let data = new FormData()

    this.storage.get("login_det").then(d=>{

      data.append('admin_id' , d.user_id)
      this.apiProvider.postData(data, 'list_order_admin.php').then(d => {
        this.res = d;
        this.res = this.res.data
        console.log(d)
      })
    })
   
   
  }
  delivered(result) {
    let alert = this.alertCtrl.create({
      title: 'Delivered ?',
      message: 'Are you delivered the product ?',
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
            this.results.splice(this.results.indexOf(result), 1)
          }
        }
      ]
    });
    alert.present();
  }
  cnfrmOrder(result) {
    console.log(result)
    let alert = this.alertCtrl.create({
      title: 'Proceed to out for delivery ?',
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
            this.presentLoadingCustom()
            let data = new FormData()
            data.append("order_id", result.order_id)
            console.log('Yes clicked');
            this.apiProvider.postData(data, "approve_order.php").then(d => {
              this.results = d
              if (this.results.status == 1) {
                this.presentToast("Approved")
              }
              else this.presentToast("Somthing went wrong")
            })
          }
        }
      ]
    });
    alert.present();
  }
  presentToast(data) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
      this.getProducts()
      this.loading.dismiss()
    });

    toast.present();
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
          Please Wait....
         </ion-col>
       </ion-row>
       </div>`,
    });

    this.loading.present();
  }
}
