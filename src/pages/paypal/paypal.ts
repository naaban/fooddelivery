import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
/**
 * Generated class for the PaypalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paypal',
  templateUrl: 'paypal.html',
})
export class PaypalPage {

  private key: any = 'AQBiY5bm1fCE2IHO2P3kVWRkxLJcH5ETR3wk_HtxQ6RqppHFTnOHmnLjKXYeDyUJPHccI3gmxqTgcXf-';
  constructor(public navCtrl: NavController, public navParams: NavParams, public payPal: PayPal) {
  }

  payment: PayPalPayment = new PayPalPayment('1', 'IN', 'trail', 'sale');
  currencies = ['IN'];
  payPalEnvironment: string = 'payPalEnvironmentSandbox';

  makePayment() {

    this.payPal.init({
      PayPalEnvironmentProduction: '',
      PayPalEnvironmentSandbox: 'AQBiY5bm1fCE2IHO2P3kVWRkxLJcH5ETR3wk_HtxQ6RqppHFTnOHmnLjKXYeDyUJPHccI3gmxqTgcXf-'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
       // payPalShippingAddressOption: 0 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        this.payPal.renderSinglePaymentUI(this.payment).then((response) => {
          alert(`Successfully paid. Status = ${response.response.state}`);
					console.log(response);
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          console.log("Error or render dialog closed without being successfull")
        });
      }, () => {
        console.log("Error in configuration")
      });
    }, () => {
      console.log("Error in initialization, maybe PayPal isn't supported or something else")
    });
  }

}
