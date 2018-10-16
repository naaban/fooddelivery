import { Component } from '@angular/core';
import { NavController, NavParams, Thumbnail } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ApiProvider } from '../../providers/api/api';
import { CartPage } from '../cart/cart';
import { FoodViewPage } from '../food-view/food-view';
import { AppPreferences } from '@ionic-native/app-preferences';
import { OrderPopoverPage } from '../order-popover/order-popover';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data: any;
  images: any;
  name: any;
  session: any;
  results: any;
  foods: any;
  rest: any;
  location: any;
<<<<<<< HEAD
  loc: any;
  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams, public apiProvider: ApiProvider) {
    // this.getRest();

    this.storage.get("location").then(d => {
      console.log(d);
      this.loc =d.locality
      this.location = d.locality + "," + d.administrativeArea;
=======
  constructor(public navCtrl: NavController,public storage :Storage,public navParams : NavParams, public apiProvider: ApiProvider) {
    // this.getRest();

    this.storage.get("location").then(d=>{
      console.log(d);
      this.location = d.locality+","+d.administrativeArea;
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
    })
    this.images = ["../../assets/imgs/rst1.jpg",
      "../../assets/imgs/rst2.jpg",
      "../../assets/imgs/rst3.jpg",
      "../../assets/imgs/rst4.jpg",
      "../../assets/imgs/rst5.jpg"];
    // this.appPreferences.fetch("user_id").then(d => {
    //   console.log(d)
    // })
    this.data = [
      {
<<<<<<< HEAD
        type_id: 1,
=======
        type_id:1,
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
        name: "Street Food",
        image: "../../assets/imgs/street_food.jpg"
      },
      {
<<<<<<< HEAD
        type_id: 2,
=======
        type_id:2,
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
        name: "Home Food",
        image: "../../assets/imgs/home_food.jpg"
      },
      {
<<<<<<< HEAD
        type_id: 3,
=======
        type_id:3,
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
        name: "Resturant Food",
        image: "../../assets/imgs/pizza.png"
      },
      {
<<<<<<< HEAD
        type_id: 4,
        name: "Grossary",
        image: "../../assets/imgs/fruits.jpg"
      }]
    this.getRest()

    this.foods = new FormData()
    this.foods.append('spl_offer', 1)
    this.foods.append('city',this.loc)  
        this.apiProvider.postData(this.foods, 'special_offer.php').then(d => {
      this.foods = d
      this.foods = this.foods.data
      console.log(this.foods)
    })
  }
=======
        type_id:4, 
        name: "Grossary",
        image: "../../assets/imgs/fruits.jpg"
      }]
      this.getRest()

      // this.rest = [{
      //   restname: "Rasikas",
      //   image: "../../assets/imgs/rasikas.jpg"
      // },
      // {
      //   restname: "KFC",
      //   image: "../../assets/imgs/kfc.jpg"
      // },
      // {
      //   restname: "Aanandas",
      //   image: "../../assets/imgs/aanandas.jpg"
      // },
      // {
      //   restname : "Star Briyani",
      //   image: "../../assets/imgs/star_briyani.jpg"
      // },
      // {
      //   restname: "Ponram",
      //   image: "../../assets/imgs/ponram.jpg"
      // }]
      this.foods = [{
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
      },
      {
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
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1

  slideData = [{ image: "../../assets/imgs/banner1.jpg" }, { image: "../../assets/imgs/banner2.jpg" }, { image: "../../assets/imgs/banner3.jpg" }];
  profile() {
    this.navCtrl.push(ProfilePage);
  }
  cart() {
    this.navCtrl.push(CartPage);
  }
  viewFood(res) {
    console.log(res)
    this.navCtrl.push(FoodViewPage, res);
  }
  getRest() {
    this.apiProvider.getData('list_resturant.php').then(d => {
      this.results = d;
      this.rest = this.results.data
<<<<<<< HEAD
      console.log(this.data);
    })
  }
  orderNow(result) {
    this.presentPopOver(result)
  }
  presentPopOver(result) {
    console.log(result);
    this.navCtrl.push(OrderPopoverPage, { "result": result })
    // let popOver = this.popOverCtrl.create(OrderPopoverPage, { "result": result })
    // popOver.present();
  }
  viewRestFood(rest) {
    console.log(rest)
    this.navCtrl.push(FoodViewPage, { id: rest.id })
=======
      // console.log(this.data);
    })
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
  viewRestFood(rest){
    console.log(rest)
    this.navCtrl.push(FoodViewPage , {id: rest.id})
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
  }
}
