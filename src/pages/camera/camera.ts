import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraServiceProvider } from '../../providers/camera-service/camera-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
   selector: 'page-camera',
   templateUrl: 'camera.html',
   providers: [CameraServiceProvider]
})
export class CameraPage {

   public camera: any;

   public serverAddress: String
   public testCameraAddress: String
   constructor(public navCtrl: NavController, public navParams: NavParams,
      public cameraServiceProvider: CameraServiceProvider, public storage: Storage) {
      storage.get('serverAddressWithKey').then((val) => {
         if (val) {
            this.serverAddress = val;
         } else {
            this.serverAddress = "";
         }
         let cameraId = navParams.get('cameraId')
         if (cameraId == undefined) {
            navCtrl.pop();
         } else {
            this.loadCameraData(cameraId);
         }
      });
      storage.get('testCameraAddress').then((val) => {
         if (val) {
            this.testCameraAddress = val;
         } else {
            this.testCameraAddress = "";
         }
      });
   }

   loadCameraData(cameraId: any) {
      this.cameraServiceProvider.get(this.serverAddress, cameraId)
         .then(data => {
            this.camera = data[0];
         });
   }

   goToCameraImage(cameraId: any) {
      window["rtspVideo"].play(this.testCameraAddress, function () {
         console.log('Done Playing.');
      }, function (e) {
         console.error('Error: ' + e);
      });
   }

}
