import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

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
  params: FormGroup;
  qtyArr: any;
  resp: any;
  isWish: boolean;
  qty: any;
  btn_txt: any;
  qty_incre: any = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public apiProvider: ApiProvider, public storage: Storage, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.result = this.navParams.get('result');
    this.isWish = navParams.get('wish');
    this.params = this.formBuilder.group({
      doorno: [''],
      city: [''],
      area: [''],
      pincode: [''],
      streetname: [''],
      state: ['']
    })
    console.log(this.result)
    console.log(this.btn_txt)
    this.qtyArr = this.result.qty
    console.log(this.qtyArr)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPopoverPage');
  }
  incre() {
    this.qty_incre++;
  }
  decre() {
    if (this.qty_incre > 0) {
      this.qty_incre--
    }
  }
  order() {
    console.log(this.isWish)
    let data = new FormData()
    if (this.isWish == false) {
      console.log(this.qty_incre)
      this.storage.get('login_det').then(d => {
        data.append('product_id', this.result.id)
        data.append('customer_id', d.user_id)
        data.append('qty', this.qty_incre)
        this.apiProvider.postData(data, 'addtowishlist.php').then(d => {
          this.resp = d;
          if (this.resp.status == 1) {
            this.resp = this.resp.data
            this.presentToast("Added to WishList")
            this.navCtrl.setRoot(HomePage)
          }
          console.log(this.resp)
        })
      })
    }
    else if (this.params.value.doorno != "" && this.params.value.city != "" && this.params.value.streetname != "" && this.params.value.pincode != "" && this.params.value.area != "") {
      this.storage.get('login_det').then(d => {
        data.append('doorno', this.params.value.doorno)
        data.append('city', this.params.value.city)
        data.append('area', this.params.value.area)
        data.append('street', this.params.value.streetname)
        data.append('state', this.params.value.state)
        data.append('pincode', this.params.value.pincode)
        data.append('product_id' , this.result.product_id)
        data.append('customer_id' , this.result.customer_id)
        data.append('qty', this.result.qty_wish)
        let alert = this.alertCtrl.create({
          title: 'Confirm Order ?',
          message: 'Can take Order.. ?',
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
                  console.log(d)
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

}
