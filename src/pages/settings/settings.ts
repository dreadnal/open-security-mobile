import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
   selector: 'page-settings',
   templateUrl: 'settings.html',
})
export class SettingsPage {

   public serverAddress: String
   public testCameraAddress: String
   public apiKey: String
   constructor(public navCtrl: NavController, public navParams: NavParams,
      public storage: Storage) {
      storage.get('serverAddress').then((val) => {
         if (val) {
            this.serverAddress = val;
         } else {
            this.serverAddress = "";
         }
      });
      storage.get('testCameraAddress').then((val) => {
         if (val) {
            this.testCameraAddress = val;
         } else {
            this.testCameraAddress = "";
         }
      });
      storage.get('apiKey').then((val) => {
         if (val) {
            this.apiKey = val;
         } else {
            this.apiKey = "";
         }
      });
   }

   public discardChanges() {
      this.storage.get('serverAddress').then((val) => {
         if (val) {
            this.serverAddress = val;
         } else {
            this.serverAddress = "";
         }
      });
      this.storage.get('testCameraAddress').then((val) => {
         if (val) {
            this.testCameraAddress = val;
         } else {
            this.testCameraAddress = "";
         }
      });
      this.storage.get('apiKey').then((val) => {
         if (val) {
            this.apiKey = val;
         } else {
            this.apiKey = "";
         }
      });
   }

   public save() {
      this.storage.set('serverAddress', this.serverAddress);
      this.storage.set('testCameraAddress', this.testCameraAddress);
      this.storage.set('apiKey', this.apiKey);
      this.storage.set('serverAddressWithKey', this.serverAddress + '/' + this.apiKey);
   }

}
