import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { OrderPopoverPage } from '../order-popover/order-popover';

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

  title: any;
  id: any;
  image: any;
  results: any;
  data: any;
  type: any;

  constructor(public navCtrl: NavController,public navParams: NavParams, public apiProvider: ApiProvider,public popOverCtrl:PopoverController) {

    this.title = this.navParams.get("name");
    this.id = this.navParams.get("id")
    this.image = this.navParams.get("image")
    this.type = this.navParams.get("type_id")
    console.log(this.type);
    if(this.id!=null)
    this.getRestProducts()
    else
    this.getProductAsType();
    // this.getData()

  }

  getProductAsType(){
    let data = new FormData;
    data.append('product_type', this.type)
    console.log(data)
    this.apiProvider.postData(data, 'list_product_astype.php').then(d => {
      this.results = d
      console.log(d)
      this.data = this.results.data
    })
  }
  getRestProducts() {
    let data = new FormData;
    data.append('admin_id', this.id)
    this.apiProvider.postData(data, 'list_product.php').then(d => {
      this.results = d
      this.data = this.results.data
    })
  }
  getData() {
    if (this.id == 1) {
      this.data = [{
        name: "Pani Poori",
        image: "../../assets/imgs/pani_poori.jpg",
        price: "Rs.20/qty",
        qty: "100"
      },
      {
        name: "Masala Poori",
        image: "../../assets/imgs/masal_poori.jpg",
        price: "Rs.25/qty",
        qty: "100"
      }]
    }
    else if (this.id == 2) {
      this.data = [{
        name: "Idly",
        image: "../../assets/imgs/idly.jpg",
        price: "Rs.10",
        qty: "250"
      },
      {
        name: "Poori",
        image: "../../assets/imgs/poori.jpg",
        price: "Rs.25",
        qty: "100"
      },
      {
        name: "Chapathi",
        image: "../../assets/imgs/chappathi.jpg",
        price: "Rs.20",
        qty: "100"
      },
      {
        name: "Briyani",
        image: "../../assets/imgs/briyani.jpg",
        price: "Rs.90",
        qty: "50"
      }]
    }
    else if (this.id == 3) {
      this.data = [{
        name: "Pizza",
        image: "../../assets/imgs/pizza.jpg",
        price: "Rs.120",
        qty: "250"
      },
      {
        name: "Burger",
        image: "../../assets/imgs/burger.jpg",
        price: "Rs.50",
        qty: "100"
      }]
    }
    else if (this.id == 4) {
      this.data = [{
        name: "Apple",
        image: "../../assets/imgs/apple.jpg",
        price: "Rs.120/kg",
        qty: "250Kgs"
      },
      {
        name: "Grapes",
        image: "../../assets/imgs/graps.jpg",
        price: "Rs.25/kg",
        qty: "100Kgs"
      },
      {
        name: "Mango",
        image: "../../assets/imgs/mango.jpg",
        price: "Rs.60/kg",
        qty: "100Kgs"
      },
      {
        name: "Water Melon",
        image: "../../assets/imgs/watermelon.jpg",
        price: "Rs.90/pcs",
        qty: "50"
      }]
    }
  }
  slideData = [{ image: "../../assets/imgs/banner1.jpg" }, { image: "../../assets/imgs/banner2.jpg" }, { image: "../../assets/imgs/banner3.jpg" }];

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
}
