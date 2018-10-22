import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the OfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html',
})
export class OfferPage {
  offers: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider: ApiProvider) {

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
    this.getOffers()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferPage');
  }

getOffers(){
  this.apiProvider.getData('list_offers_customer.php').then(d=>{
    this.offers = d;
    console.log(this.offers)
    if(this.offers.status == 1){
      this.offers = this.offers.data
    }
  })
}

}
