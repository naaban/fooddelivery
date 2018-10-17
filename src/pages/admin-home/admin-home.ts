import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ActionSheetController, ToastController } from 'ionic-angular';
import { AdminProfilePage } from '../admin-profile/admin-profile';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AddFoodPage } from '../add-food/add-food';
import { AdminPopoverPage } from '../admin-popover/admin-popover';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage'
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
  location: any;
  session: any;
  user_det : any;
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
  constructor(public navCtrl: NavController,public toastCtrl:ToastController, public navParams: NavParams, public alertCtrl: AlertController, public camera: Camera, public popOverCtrl: PopoverController, public actionSheetCtrl: ActionSheetController, public apiProvider: ApiProvider, public storage: Storage) {
    // this.getProduct()
   
    this.resturant.name = "Rasikas"
    this.user_det = this.storage.get("user_det");
    this.getProduct()
  }
  addFood() {
    this.navCtrl.push(AddFoodPage)
  }
  editFood() {
  }
  deleteFood(event) {
    console.log(event)
    this.storage.get("login_det").then(d=>{
      this.session = d;
      console.log(this.session)

    let data = new FormData()
    data.append('admin_id', this.session.user_id)
    data.append('prod_id', event.id)
    this.apiProvider.postData(data ,'delete_product.php').then(d=>{
      this.results = d
      console.log(this.results)
      if(this.results.status == 1){
        this.getProduct()
        this.presentToast("Deleted Successfully")
      }
      else {
        this.getProduct()
        this.presentToast("Network Error")
      }
    })
  })
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
            this.deleteFood(event)
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
  
  presentPopOver(event) {
    console.log(event);
    let popOver = this.popOverCtrl.create(AdminPopoverPage, { "event": event })
    popOver.present();
  }

  getProduct() {
    let admin_id = new FormData()
    admin_id.append('admin_id', "1");
    this.apiProvider.postData(admin_id, 'list_product_admin.php').then(d => {
      this.results = d
      console.log(this.results);
      this.data = this.results.data;
    })
  }

  orderList() {
    this.navCtrl.push(AdminOrderlistPage)
  }
  presentToast(data) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
