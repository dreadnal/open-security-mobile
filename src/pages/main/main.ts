import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CamerasPage } from '../cameras/cameras';
import { EventsPage } from '../events/events';
import { HomePage } from '../home/home';
import { SensorsPage } from '../sensors/sensors';
import { SettingsPage } from '../settings/settings';
import { SettingServiceProvider } from '../../providers/setting-service/setting-service'
import { Storage } from '@ionic/storage';

@Component({
   selector: 'page-main',
   templateUrl: 'main.html'
})
export class MainPage {

   camerasPage = CamerasPage;
   eventsPage = EventsPage;
   homePage = HomePage;
   sensorsPage = SensorsPage;
   settingsPage = SettingsPage;

   public setting: any;
   public authResonse: any;

   ionViewWillEnter() {
    this.storage.get('verified').then((val) => {
      if (!val || val == false) {
        this.logout();
      }
    });
   }

   public serverAddress: String
   constructor(public navCtrl: NavController, public navParams: NavParams,
      public settingServiceProvider: SettingServiceProvider, public storage: Storage,
      public alertController: AlertController) {

   }

   public logout() {
     this.storage.clear();
     this.navCtrl.setRoot(this.homePage);
   }

   public enableSystem() {
      this.settingServiceProvider.enable(this.serverAddress, 'systemEnabled')
         .then(data => {
            this.setting = data;
         });
   }

   public disableSystem() {
      this.settingServiceProvider.disable(this.serverAddress, 'systemEnabled')
         .then(data => {
            this.setting = data;
         });
   }

   public alertRegistered() {
      let alert = this.alertController.create({
         title: 'Registered',
         subTitle: 'Device is registered.',
         buttons: ['Dismiss']
      });
      alert.present();
   }
}
