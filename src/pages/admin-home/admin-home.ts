import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ActionSheetController } from 'ionic-angular';
import { AdminProfilePage } from '../admin-profile/admin-profile';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AddFoodPage } from '../add-food/add-food';
import { AdminPopoverPage } from '../admin-popover/admin-popover';
import { ApiProvider } from '../../providers/api/api';
<<<<<<< HEAD
import { Storage } from '@ionic/storage'
=======
import {Storage } from '@ionic/storage'
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
import { AdminOrderlistPage } from '../admin-orderlist/admin-orderlist';

/**
 * Generated class for the AdminHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html',
})
export class AdminHomePage {

  base64Image: any;
  productType: any;
  data: any;
<<<<<<< HEAD
  location: any;
  user_det : any;
=======
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
  resturant = {
    name: "",
    foods: [{
      name: "",
      price: "",
      imagePath: ""
    }],
    offers: [{
    }],
    discounts: [{
    }]
  }
  results: any;
<<<<<<< HEAD
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public camera: Camera, public popOverCtrl: PopoverController, public actionSheetCtrl: ActionSheetController, public apiProvider: ApiProvider, public storage: Storage) {
    // this.getProduct()
    this.data = [{
      name: "Apple",
      image: "../../assets/imgs/apple.jpg"
    },
    {
      name: "Grapes",
      image: "../../assets/imgs/graps.jpg"
    }]
    this.resturant.name = "Rasikas"
    this.user_det = this.storage.get("user_det");
=======
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public camera: Camera, public popOverCtrl: PopoverController, public actionSheetCtrl: ActionSheetController, public apiProvider: ApiProvider,public storage : Storage) {
   // this.getProduct()
   this.data=[{
     name:"Apple",
     image:"../../assets/imgs/apple.jpg"
   },
   {
  name:"Grapes",
  image: "../../assets/imgs/graps.jpg"
   }]
    this.resturant.name = "Rasikas"
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
  }
  addFood() {
    this.navCtrl.push(AddFoodPage)
  }
  editFood() {
  }
  deleteFood() {
  }
  profile() {
    this.navCtrl.push(AdminProfilePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminHomePage');
  }

  presentActionSheet(event) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify',
      buttons: [
        {
          text: 'Edit',
          role: 'edit',
          handler: () => {
            this.presentPopOver(event)
          }
        }, {
          text: 'Delete',
          role: 'delete',
          handler: () => {
            console.log('Archive clicked');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
<<<<<<< HEAD
  
  presentPopOver(event) {
    console.log(event);
    let popOver = this.popOverCtrl.create(AdminPopoverPage, { "event": event })
    popOver.present();
  }

  getProduct() {
    let admin_id = new FormData()
    admin_id.append('admin_id', "1");
    this.apiProvider.postData(admin_id, 'list_product.php').then(d => {
=======
 presentPopOver(event) {
    console.log(event);
    let popOver = this.popOverCtrl.create(AdminPopoverPage, { "event": event })
    popOver.present();
  } 

  getProduct() {
    let admin_id = new FormData()
    admin_id.append('admin_id' , "1");
      this.apiProvider.postData(admin_id, 'list_product.php').then(d => {
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
      this.results = d
      console.log(this.results);
      this.data = this.results.data;
    })
  }

<<<<<<< HEAD
  orderList() {
=======
  orderList(){
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
    this.navCtrl.push(AdminOrderlistPage)
  }
}
