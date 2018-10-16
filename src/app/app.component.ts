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
import { CartPage } from '../pages/cart/cart';
import { ProfilePage } from '../pages/profile/profile';
<<<<<<< HEAD
import { RegisterPage } from '../pages/register/register';
=======
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
<<<<<<< HEAD
  rootPage:any = LoginPage;
=======
  rootPage:any = AdminHomePage;
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
  pages: Array<{title: string, component: any,name:string}>;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      this.pages = [
        { title: 'Home', component: HomePage,name:"md-home" },
        { title: 'Offers', component: OfferPage,name:"md-flame" },
        { title:'Orders', component : CartPage,name:"md-cart"},
        { title:'Profile' , component:ProfilePage,name:"md-contact"},
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

