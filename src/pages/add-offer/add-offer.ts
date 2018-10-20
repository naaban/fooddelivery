import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddOfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-offer',
  templateUrl: 'add-offer.html',
})
export class AddOfferPage {

  offers: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    this.offers = [{
      image: "../../assets/imgs/offer1.jpg"
    },
    {
      image: "../../assets/imgs/offer2.jpg"
    },
    {
      image: "../../assets/imgs/offer3.jpg"
    },
    {
      image: "../../assets/imgs/offer4.jpg"
    },
    {
      image: "../../assets/imgs/food5.jpg"
    }]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferPage');
  }

}
