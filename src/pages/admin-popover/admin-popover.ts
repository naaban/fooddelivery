import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FormGroup, FormBuilder } from '@angular/forms';

/**
 * Generated class for the AdminPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-popover',
  templateUrl: 'admin-popover.html',
})
export class AdminPopoverPage {

  event: any;
  updates: FormGroup;
  results: any;
  constructor(public navCtrl: NavController,public toastCtrl : ToastController, public viewCtrl : ViewController,public navParams: NavParams, public apiProvider: ApiProvider,public formBuilder : FormBuilder) {
    this.event = this.navParams.get('event');
    console.log(this.event)
    this.updates = this.formBuilder.group({
      foodname:[''],
      fooddescription:[''],
      price: [''],
      qty: ['']
    })
  }

  ionViewDidLoad() {
  }

  update(){
    let data;
    this.apiProvider.postData(data,'list_product.php').then(d=>{
      this.results = d;
      if(this.results.status == 1){
        this.viewCtrl.dismiss()
      }
      else{
        this.toastCtrl.create({
          message: "Somethin went wrong Please Try again Later"
        })
      }
     
    })
    
  }

}
