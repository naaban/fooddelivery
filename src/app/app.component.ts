import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { FoodViewPage } from '../pages/food-view/food-view';
import { AdminOrderlistPage } from '../pages/admin-orderlist/admin-orderlist';
import { AdminHomePage } from '../pages/admin-home/admin-home';
import { LocationPickerPage } from '../pages/location-picker/location-picker';
import { OfferPage } from '../pages/offer/offer';
import { ProfilePage } from '../pages/profile/profile';
import { RegisterPage } from '../pages/register/register';
import { AddFoodPage } from '../pages/add-food/add-food';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { OrderPage } from '../pages/order/order';
import { SuAdminHomePage } from '../pages/su-admin-home/su-admin-home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  pages: Array<{title: string, component: any,name:string}>;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      this.pages = [
        { title: 'Home', component: HomePage,name:"md-home" },
        {title: 'WishList' , component:WishlistPage , name:"md-heart" },
        { title: 'Offers', component: OfferPage,name:"md-flame" },
        { title:'Orders', component : OrderPage,name:"md-cart"},
        { title:'Profile' , component:ProfilePage,name:"md-contact"}
      ];
  
      statusBar.styleLightContent();
      splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

