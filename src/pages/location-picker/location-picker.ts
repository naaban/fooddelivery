import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
<<<<<<< HEAD
import { Geolocation } from '@ionic-native/geolocation'
=======
import { Geolocation} from '@ionic-native/geolocation'
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { AdminHomePage } from '../admin-home/admin-home';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
<<<<<<< HEAD
import { RegisterPage } from '../register/register';
=======
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1



/**
 * Generated class for the LocationPickerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-location-picker',
  templateUrl: 'location-picker.html',
})
export class LocationPickerPage {
<<<<<<< HEAD
  page: any;
  params: any;
  isVisible: boolean;
  map: any;
  signup: any;
  constructor(public navCtrl: NavController, public storage: Storage, public alertCtrl: AlertController, public navParams: NavParams, public geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {
    this.setTimeOut();
    this.params = this.navParams.get('login');
    console.log(this.params)
    this.signup = this.navParams.get("signup")
    console.log(this.signup)
  }


  setTimeOut() {
    setTimeout(() => {
      this.getLocation(), {
        duration: 200, // The length in milliseconds the animation should take.
      };
    }, 2000);
  }
  getLocation() {
    if (this.signup) {
      this.page = RegisterPage;
    }
    else if (!this.params) {
      this.page = HomePage;
    }
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords)
      if (resp != null) {
        this.getGeoCoder(resp.coords.latitude, resp.coords.longitude)
        this.navCtrl.setRoot(this.page);
      }
      else {
=======
  page : any;
  params : any;
  isVisible : boolean;
  map : any;
  constructor(public navCtrl: NavController,public storage : Storage,public alertCtrl : AlertController , public navParams: NavParams  , public geolocation : Geolocation,private nativeGeocoder: NativeGeocoder){
    this.setTimeOut();
    this.params = this.navParams.get('login');
    console.log(this.params)
  }

 
  setTimeOut(){
    setTimeout(() => {
      this.getLocation() , {
          duration: 200, // The length in milliseconds the animation should take.
      };
  },2000);
  }
   getLocation() {
    if(this.params){
      this.page = AdminHomePage;
    }
    else  {this.page = HomePage;}
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords)
      if(resp!=null){
        this.getGeoCoder(resp.coords.latitude , resp.coords.longitude)
        this.navCtrl.setRoot(this.page);
      }
      else{
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
        this.setTimeOut();
      }

    }).catch((error) => {
<<<<<<< HEAD
      this.isVisible = false
      console.log('Error getting location', error);
      this.setTimeOut()
    });
  }
  getGeoCoder(lat, lon) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(lat, lon, options)
      .then((result: NativeGeocoderReverseResult[]) => this.storage.set("location", result[0]))
      .catch((error: any) => this.isVisible = false);
  }


  mapSearchBar(ev) {
    console.log(ev)
    const autocomplete = new google.maps.places.Autocomplete(ev);
=======
      this.isVisible=false
      console.log('Error getting location', error);
      this.setTimeOut()
      
    });
  }

  getGeoCoder(lat , lon){
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };
   this.nativeGeocoder.reverseGeocode(lat, lon, options)
  .then((result: NativeGeocoderReverseResult[]) => this.storage.set("location" , result[0]))
  .catch((error: any) => this.isVisible=false);
  }


  mapSearchBar(ev){
    console.log(ev)
    const autocomplete  = new google.maps.places.Autocomplete(ev);
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          sub.next(place.geometry.location);
          sub.complete();
        }
      });
    });

  }
<<<<<<< HEAD
  pickLocation() {
=======
  pickLocation(){
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
    this.isVisible = false;
  }
}