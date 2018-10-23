import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {Storage} from '@ionic/storage'

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

  constructor(public navCtrl: NavController, public storage : Storage,public navParams: NavParams,public apiProvider: ApiProvider) {
    this.getOffers()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferPage');
  }

getOffers(){
  this.storage.get('location').then(d=>{
    this.apiProvider.getData('list_offers_customer.php?city='+d.locality).then(d=>{
      this.offers = d;
      console.log(this.offers)
      if(this.offers.status == 1){
        this.offers = this.offers.data
      }
    })
  })
 
}

}
