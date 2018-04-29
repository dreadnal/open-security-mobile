import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CamerasPage } from '../cameras/cameras';
import { EventsPage } from '../events/events';
import { LiveModePage } from '../live-mode/live-mode';
import { SensorsPage } from '../sensors/sensors';
import { SettingsPage } from '../settings/settings';
import { SettingServiceProvider } from '../../providers/setting-service/setting-service'
import { Storage } from '@ionic/storage';

@Component({
   selector: 'page-home',
   templateUrl: 'home.html'
})
export class HomePage {

   camerasPage = CamerasPage;
   eventsPage = EventsPage;
   liveModePage = LiveModePage;
   sensorsPage = SensorsPage;
   settingsPage = SettingsPage;

   public setting: any;
   public authResonse: any;

   ionViewWillEnter() {
      this.storage.get('serverAddressWithKey').then((val) => {
         if (val) {
            this.serverAddress = val;
         } else {
            this.serverAddress = "";
         }
         this.loadSystemEnabled();
         this.checkSystem();
      });
   }

   public serverAddress: String
   constructor(public navCtrl: NavController, public navParams: NavParams,
      public settingServiceProvider: SettingServiceProvider, public storage: Storage,
      public alertController: AlertController) {

   }

   loadSystemEnabled() {
      this.settingServiceProvider.get(this.serverAddress, 'systemEnabled')
         .then(data => {
            this.setting = data[0];
         });
   }

   checkSystem() {
      this.settingServiceProvider.check(this.serverAddress)
         .then(data => {
            this.authResonse = data;
            if (!this.authResonse.connect) {
               this.alertConnectionError();
               return;
            }
            if (!this.authResonse.auth) {
               this.alertAuthError();
               return;
            }
         })
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

   public alertConnectionError() {
      let alert = this.alertController.create({
         title: 'Connection error',
         subTitle: 'Failed to connect to server.',
         buttons: ['Dismiss']
      });
      alert.present();
   }

   public alertAuthError() {
      let alert = this.alertController.create({
         title: 'Authentication error',
         subTitle: 'Failed verify application. Please check API key in settings.',
         buttons: ['Dismiss']
      });
      alert.present();
   }
}
