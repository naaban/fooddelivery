import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Loading, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { OrderPopoverPage } from '../order-popover/order-popover';
import{ Storage } from '@ionic/storage' 

/**
 * Generated class for the FoodViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-food-view',
  templateUrl: 'food-view.html',
})
export class FoodViewPage {

  rest: any;
  id: any;
  image: any;
  results: any;
  data: any;
  type: any;
  resturant : any;
  loading : Loading;
  slideData:  any;
  constructor(public navCtrl: NavController,public loadingCtrl : LoadingController,public storage : Storage,public navParams: NavParams, public apiProvider: ApiProvider,public popOverCtrl:PopoverController) {

    this.rest = this.navParams.get("rest");
    this.resturant = this.navParams.get("resturant")
    console.log(this.rest);
    if(this.resturant==true)
    this.getRestProducts()
    else
    this.getProductAsType();
    // this.getData()
    this.apiProvider.getData("list_ads.php").then(d=>{
      this.slideData = d;
      console.log(d)
      this.slideData = this.slideData.data
    })
  }
  getProductAsType(){
    this.storage.get("login_det").then(d=>{
      let data = new FormData;
      console.log(d.locality)
      data.append('product_type', this.rest.type_id)
      data.append('city',d.locality)
      console.log(data)
      this.apiProvider.postData(data, 'list_product_astype.php').then(d => {
        this.results = d
        console.log(d)
        this.data = this.results.data
      })
    })
    
  }
  getRestProducts() {
    this.presentLoadingCustom()
    this.loading.present().then(()=>{
      let data = new FormData;
      data.append('admin_id', this.rest.id)
      this.apiProvider.postData(data, 'list_product.php').then(d => {
        this.results = d
        if(this.results.status == 1)
        this.loading.dismiss()
        this.data = this.results.data
      })
    })
    
  }
  // slideData = [{ image: "../../assets/imgs/banner1.jpg" }, { image: "../../assets/imgs/banner2.jpg" }, { image: "../../assets/imgs/banner3.jpg" }];

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodViewPage');
  }

  orderNow(result){
    this.presentPopOver(result)
  }
  presentPopOver(result) {  
    console.log(result);
    this.navCtrl.push(OrderPopoverPage , {"result" : result})
    // let popOver = this.popOverCtrl.create(OrderPopoverPage, { "result": result })
    // popOver.present();
  }
  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div >
       <ion-row class="loadingBar">
         <ion-col>
         <img class="image" src="../../assets/imgs/loginlogo.svg" alt="" width="120" height="120">
         </ion-col>
         <ion-col style="color:#000">
           Loading Please Wait..
         </ion-col>
       </ion-row>
       </div>`,
      duration: 500
    });
  }
}
