import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {Storage} from "@ionic/storage"
import { OrderPopoverPage } from '../order-popover/order-popover';

/**
 * Generated class for the WishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {

  wishlist : any;

  constructor(public navCtrl: NavController,public storage : Storage,public apiProvider : ApiProvider, public navParams: NavParams) {
    this.getWishList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');
  }
  
  getWishList(){
    this.storage.get("login_det").then(d=>{
      let data = new FormData()
      data.append('cust_id',d.user_id)
      this.apiProvider.postData(data , "list_wishlist.php").then(d=>{
        this.wishlist = d;
        console.log(d)
        if(this.wishlist.status == 1){
          this.wishlist = this.wishlist.data
        }
      })
    })
  }
  orderNow(result){
    this.navCtrl.push(OrderPopoverPage , {wish : true,result : result})

  }
}
