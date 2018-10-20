import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {Storage} from '@ionic/storage'

/**
 * Generated class for the OrderViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-view',
  templateUrl: 'order-view.html',
})
export class OrderViewPage {

  order_det : any;
  price: any;
  constructor(public navCtrl: NavController,public storage : Storage, public navParams: NavParams, public apiProvider : ApiProvider) {
     this.order_det =  this.navParams.get("order")
     this.price = this.order_det.qty * this.order_det.price;
      console.log(this.price)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderViewPage');
  }

  getOrders(){
    let cust_id;
    this.storage.get("login_det").then(d=>{
      cust_id = d;
    })
    let data = new FormData()
    data.append('cust_id',cust_id)
    this.apiProvider.postData(data , 'list_order_customer.php').then(d=>{
      this.order_det = d;
      this.order_det = this.order_det.data
      
      console.log(this.order_det)
    })
  }

}
