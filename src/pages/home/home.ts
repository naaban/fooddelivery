import { Component } from '@angular/core';
import { NavController, NavParams, Thumbnail } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ApiProvider } from '../../providers/api/api';
import { FoodViewPage } from '../food-view/food-view';
import { OrderPopoverPage } from '../order-popover/order-popover';
import { Storage } from '@ionic/storage';
import { OrderPage } from '../order/order';


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
  loc: any;
  slideData : any;
  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams, public apiProvider: ApiProvider) {
    // this.getRest();
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
      type_id: 1,
      name: "Street Food",
      image: "../../assets/imgs/street_food.jpg"
    },
    {
      type_id: 2,
      name: "Homely Food",
      image: "../../assets/imgs/home_food.jpg"
    },
    {
      type_id: 3,
      name: "Resturant",
      image: "../../assets/imgs/pizza.png"
    },
    {
      type_id: 4,
      name: "Groscery",
      image: "../../assets/imgs/groscery.jpg"
    },
  {
    type_id:5,
    name: "Dry fruites and Vegitables",
    image: "../../assets/imgs/fruits.jpg"
  }]
  this.getRest()

    this.storage.get("location").then(d => {
      console.log(d);
      this.loc = d.locality
      this.location = d.locality + "," + d.administrativeArea;
    
    this.foods = new FormData()
    this.foods.append('spl_offer', 1)
    this.foods.append('city',this.loc)  
        this.apiProvider.postData(this.foods, 'special_offer.php').then(d => {
      this.foods = d
      this.foods = this.foods.data
      console.log(this.foods.data)
    })
  })
    this.slideData = [{ image: "../../assets/imgs/banner1.jpg" }, { image: "../../assets/imgs/banner2.jpg" }, { image: "../../assets/imgs/banner3.jpg" }];
    this.sliderAd()
  }

 
  profile() {
    this.navCtrl.push(ProfilePage);
  }
  sliderAd(){
    this.apiProvider.getData('list_ads.php').then(d=>{
      this.slideData =d ;
      this.slideData = this.slideData.data
    })
  }
  cart() {
    this.navCtrl.push(OrderPage , {wish : false});
  }
  viewFood(res) {
    console.log(res)
    this.navCtrl.push(FoodViewPage, {rest:res,resturant:false});
  }
  getRest() {
    let data = new FormData()
    data.append('city', 'Salem')
    this.apiProvider.postData(data,'list_resturant.php').then(d => {
      this.results = d;
      this.rest = this.results.data
      console.log(this.data);
    })
  }
  orderNow(result) {
    this.presentPopOver(result)
  }
  presentPopOver(result) {
    console.log(result);
    this.navCtrl.push(OrderPopoverPage, { "result": result , wish : false})
    // let popOver = this.popOverCtrl.create(OrderPopoverPage, { "result": result })
    // popOver.present();
  }
  viewRestFood(rest) {
    console.log(rest)
    this.navCtrl.push(FoodViewPage, {rest:rest,resturant:true})
  }
}
