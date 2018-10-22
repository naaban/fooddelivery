import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Geolocation } from '@ionic-native/geolocation'
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { AdminHomePage } from '../admin-home/admin-home';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { RegisterPage } from '../register/register';



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
  page: any;
  params: any;
  isVisible: boolean;
  map: any;
  signup: any = false;
  constructor(public navCtrl: NavController, public storage: Storage, public alertCtrl: AlertController, public navParams: NavParams, public geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {
    this.getLocation();
    this.params = this.navParams.get('login');
    console.log(this.params)
    this.signup = this.navParams.get("signup")
    console.log(this.signup)

    console.log('Hello Location Picker');
  }


  /*setTimeOut() {
    setTimeout(() => {
      this.getLocation(), {
        duration: 400, // The length in milliseconds the animation should take.
      };
    }, 2000);
  }*/
  getLocation() {
    if (this.signup) {
      this.page = RegisterPage;
    }
    else if (!this.params) {
      this.page = HomePage;
    }
    else if(this.params){
      this.page = AdminHomePage
    }
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp)
      if (resp != null) {
        this.getGeoCoder(resp.coords.latitude, resp.coords.longitude)
        this.navCtrl.setRoot(this.page);
      }
    }).catch((error) => {
      this.isVisible = false
      console.log('Error getting location', error);
    });
  }
  getGeoCoder(lat, lon) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(lat, lon, options)
      .then((result: NativeGeocoderReverseResult[]) => {this.storage.set("location", result[0]); console.log(result[0])})
      .catch((error: any) => this.isVisible = false);
  }


  mapSearchBar(ev) {
    console.log(ev)
    const autocomplete = new google.maps.places.Autocomplete(ev);
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
  pickLocation() {
    this.isVisible = false;
  }
}