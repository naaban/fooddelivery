import { Component } from '@angular/core';
<<<<<<< HEAD
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
=======
import { IonicPage, NavController, NavParams } from 'ionic-angular';
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1

/**
 * Generated class for the OrderPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-popover',
  templateUrl: 'order-popover.html',
})
export class OrderPopoverPage {

  result: any;
<<<<<<< HEAD
  params: FormGroup;
  qtyArr: any;
  resp: any;
  qty: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public apiProvider: ApiProvider, public storage: Storage,public alertCtrl : AlertController, public toastCtrl: ToastController) {
    this.result = this.navParams.get('result');
    this.params = this.formBuilder.group({
      doorno: [''],
      city: [''],
      area: [''],
      pincode: [''],
      streetname: [''],
      state: ['']
    })
    this.qtyArr = this.result.qty
    console.log(this.qty)
=======
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.result = this.navParams.get('result');
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPopoverPage');
  }

<<<<<<< HEAD
  order() {

    if(this.params.value.doorno!="" && this.params.value.city!="" && this.params.value.streetname!="" && this.params.value.pincode!="" && this.params.value.area!="" && this.qty!=""){
        console.log(this.qty)
    let data = new FormData()
    this.storage.get('login_det').then(d => {
      data.append('doorno', this.params.value.doorno)
      data.append('city', this.params.value.city)
      data.append('qty', this.qty)
      data.append('area', this.params.value
      .area)
      data.append('street', this.params.value.streetname)
      data.append('state', this.params.value.state)
      data.append('pincode', this.params.value.pincode)
      data.append('product_id', this.result.id)
      data.append('customer_id', d.user_id)
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
              this.apiProvider.postData(data, 'order.php').then(d => {
                this.resp = d;
                if (this.resp.status == 1) {
                  this.resp = this.resp.data
                  this.presentToast("Order Success \n" + this.resp.order_id)
                  this.navCtrl.setRoot(HomePage)
                }
                console.log(this.resp)
              })
            }
          }
        ]
      });
      alert.present();

    })
  }
  else this.presentToast("Please Fill all Fields to Proceed")
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

=======
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
}
