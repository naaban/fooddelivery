import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.order_det =  this.navParams.get("order")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderViewPage');
  }

}
