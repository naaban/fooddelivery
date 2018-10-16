import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

    this.results = [{
      name: "Naban",
      product: "Grapes",
      qty:"5 kgs",
      price:"Rs.550",
      image: "../../assets/imgs/graps.jpg",
      order_no: "#FOOD100004",
      doorNo: "11/37 Rangapuram,",
      district:"Salem 636010"
    },
    {
      name: "Kumar",
      product: "Apple",
      qty:"10 kgs",
      price:"Rs.1000",
      image: "../../assets/imgs/apple.jpg",
      order_no: "#FOOD100018",
      doorNo: "158/107 Sivagapuram,",
      district: "Salem 636010"
    }]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminOrderlistPage');
  }

  delivered(result){
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
              this.results.splice(this.results.indexOf(result) , 1)
            }
          }
        ]
      });
      alert.present();
    
   

  }

}
