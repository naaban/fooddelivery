import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
<<<<<<< HEAD
import {Storage} from '@ionic/storage'
import { ApiProvider } from '../../providers/api/api';
import { OrderViewPage } from '../order-view/order-view';
=======
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  results: any;
<<<<<<< HEAD
  user_det: any;
  data: any;
  constructor(public navCtrl: NavController,public apiProvider : ApiProvider, public navParams: NavParams, public storage : Storage) {
=======
  constructor(public navCtrl: NavController, public navParams: NavParams) {
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
    this.results = [{
      image : "../../assets/imgs/burger.jpg",
      name : "Burger",
      order_no: "FOOD100001",
      status: "On the Way"
     },
     {
      image : "../../assets/imgs/graps.jpg",
      name : "Grapes",
      order_no: "FOOD100002",
      status: "Will reach you in 5 mins"
     }
    ]
<<<<<<< HEAD
    
    this.getOrders();

  
=======
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

<<<<<<< HEAD
  getDetails() {

  }
   getOrders(){
    this.storage.get("login_det").then(d=>{
      this.user_det = d;
      console.log(this.user_det.user_id)
      let data = new FormData()
      data.append('cust_id' , this.user_det.user_id)
      this.apiProvider.postData(data , 'list_order_customer.php').then(dat=>{
        console.log(dat)
        this.data = dat;
        if(this.data.status == 1){
          this.results = this.data.data
          console.log(this.data)
        }
      },(err)=>{
        console.log(err)
      })
    })

  }

  orderView(result){
    console.log(result)
    this.navCtrl.push(OrderViewPage , {"order" : result})
  }

=======
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
}