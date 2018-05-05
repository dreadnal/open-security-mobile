import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public server_address: String;
  public device_name: String;

  public homePage = HomePage;

  ionViewWillEnter() {
    this.storage.get('verified').then((val) => {
      if (val && val == true) {
        this.fetch();
      } else {
        this.logout();
      }
    });
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public storage: Storage) {
  }

  private fetch() {
    this.storage.get('server_address').then((val) => {
      if (val) {
        this.server_address = val;
      } else {
        this.server_address = "";
      }
    });
    this.storage.get('device_name').then((val) => {
      if (val) {
        this.device_name = val;
      } else {
        this.device_name = "";
      }
    });
  }

  public logout() {
    this.storage.clear();
    this.navCtrl.setRoot(this.homePage);
  }

}
