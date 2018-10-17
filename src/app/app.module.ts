import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ApiProvider } from '../providers/api/api';
import { HttpClientModule } from '@angular/common/http';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LogincustomComponent } from '../components/logincustom/logincustom';
import { FoodViewPage } from '../pages/food-view/food-view';
import { AdminHomePage } from '../pages/admin-home/admin-home';
import { AdminProfilePage } from '../pages/admin-profile/admin-profile';
import { Camera } from '@ionic-native/camera';
import { AddFoodPage } from '../pages/add-food/add-food';
import { AdminPopoverPage } from '../pages/admin-popover/admin-popover';
import { IonicStorageModule } from '@ionic/storage';
import { Base64 } from '@ionic-native/base64';
import { AppPreferences } from '@ionic-native/app-preferences';
import { GoogleMaps } from '@ionic-native/google-maps';
import { OrderPopoverPage } from '../pages/order-popover/order-popover';
import { AdminOrderlistPage } from '../pages/admin-orderlist/admin-orderlist';
import { LocationPickerPage } from '../pages/location-picker/location-picker';
import { OfferPage } from '../pages/offer/offer';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { OrderViewPage } from '../pages/order-view/order-view';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { OrderPage } from '../pages/order/order';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AdminHomePage,
    ProfilePage,
    AdminProfilePage,
    AdminOrderlistPage,
    AdminPopoverPage,
    LoginPage,
    WishlistPage,
    OfferPage,
    AddFoodPage,
    OrderPopoverPage,
    OrderPage,
    LocationPickerPage,
    FoodViewPage,
    RegisterPage,
    OrderViewPage,
    LogincustomComponent
  ],  
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AdminHomePage,
    AdminProfilePage,
    HomePage,
    AdminOrderlistPage,
    ProfilePage,
    WishlistPage,
    AddFoodPage,
    OrderViewPage,
    OrderPage,
    LocationPickerPage,
    OfferPage,
    OrderPopoverPage,
    AdminPopoverPage,
    FoodViewPage,
    LoginPage,
    RegisterPage,
    LogincustomComponent
  ],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    NativeGeocoder,
    FileTransfer,
    Geolocation,
    Base64,
    GoogleMaps,
    AppPreferences,
    FileTransferObject,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiProvider
  ]
})
export class AppModule { }
