import { Component } from '@angular/core';
import { NavController, NavParams, Thumbnail, LoadingController, Loading } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ApiProvider } from '../../providers/api/api';
import { FoodViewPage } from '../food-view/food-view';
import { OrderPopoverPage } from '../order-popover/order-popover';
import { Storage } from '@ionic/storage';
import { OrderPage } from '../order/order';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';


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
  slideData: any;
  loading: Loading;
  hiddenSlide: any = true;
  slides: any = null;
  constructor(public navCtrl: NavController, public geolocation: Geolocation, public nativeGeocoder: NativeGeocoder, public storage: Storage, public loadingCtrl: LoadingController, public navParams: NavParams, public apiProvider: ApiProvider) {
    // this.getRest();
    this.images = ["../../assets/imgs/rst1.jpg",
      "../../assets/imgs/rst2.jpg",
      "../../assets/imgs/rst3.jpg",
      "../../assets/imgs/rst4.jpg",
      "../../assets/imgs/rst5.jpg"];
    // this.appPreferences.fetch("user_id").then(d => {
    //   console.log(d)
    // })
    this.storage.get("location").then(d => {
      this.loc = d.locality;
      console.log(this.loc)
      this.location = this.loc
    })
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
        type_id: 5,
        name: "Dry fruites and Vegitables",
        image: "../../assets/imgs/fruits.jpg"
      }]
    this.getLocation()
    // this.slideData =[{image :"../../assets/imgs/banner1.jpg"} , {image: "../../assets/imgs/banner2.jpg"}];
    // this.slideData = this.storage.get("slides").then(d=>{
    //   this.slideData = d;
    //   console.log(d)
    //   this.hiddenSlide = false;
    // })

    this.apiProvider.getData("list_ads.php").then(d=>{
      this.slideData = d;
      console.log(d)
      this.slideData = this.slideData.data
    })
  }
  splOffer() {
    this.storage.get("location").then(d => {
      console.log(d);
      this.location = this.loc.locality
      this.foods = new FormData()
      this.foods.append('spl_offer', 1)
      this.foods.append('city', this.location)
      this.apiProvider.postData(this.foods, 'special_offer.php').then(d => {
        this.foods = d
        this.foods = this.foods.data
        console.log(this.foods.data)
      })
    })
  }
  profile() {
    this.navCtrl.push(ProfilePage);
  }
  cart() {
    this.navCtrl.push(OrderPage, { wish: false });
  }
  viewFood(res) {
    console.log(res)
    this.navCtrl.push(FoodViewPage, { rest: res, resturant: false });
  }
  getRest() {
    this.storage.get("location").then(d => {
      // console.log(d);
      // this.loc = d.locality;
      // console.log(this.loc)
      // this.location = this.loc
      this.location = this.loc.locality
      let data = new FormData()
      data.append('city', this.location)
      this.apiProvider.postData(data, 'list_resturant.php').then(d => {
        this.results = d;
        this.rest = this.results.data
        console.log(this.data);
      })
    })
  }
  orderNow(result) {
    this.presentPopOver(result)
  }
  presentPopOver(result) {
    console.log(result);
    this.navCtrl.push(OrderPopoverPage, { "result": result, wish: false })
    // let popOver = this.popOverCtrl.create(OrderPopoverPage, { "result": result })
    // popOver.present();
  }
  viewRestFood(rest) {
    console.log(rest)
    this.navCtrl.push(FoodViewPage, { rest: rest, resturant: true })
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp)
      this.getGeoCoder(resp.coords.latitude, resp.coords.longitude)
    }).catch((error) => {

      console.log('Error getting location', error);
    });
  }
  getGeoCoder(lat, lon) {
    this.presentLoadingCustom()
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(lat, lon, options)
      .then((result: NativeGeocoderReverseResult[]) => this.loc = result[0])
      .catch((error: any) => console.log(error));
    this.loading.present().then(() => {
      this.getRest()
      this.splOffer()
      this.loading.dismiss()
    })
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
