import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraServiceProvider } from '../../providers/camera-service/camera-service'
import { CameraPage } from '../camera/camera'
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
   selector: 'page-cameras',
   templateUrl: 'cameras.html',
   providers: [CameraServiceProvider]
})
export class CamerasPage {

   public cameras: any;

   cameraPage = CameraPage;

   public serverAddress: String
   constructor(public navCtrl: NavController, public navParams: NavParams,
      public cameraServiceProvider: CameraServiceProvider, public storage: Storage) {
      storage.get('serverAddressWithKey').then((val) => {
         if (val) {
            this.serverAddress = val;
         } else {
            this.serverAddress = "";
         }
         this.loadCameras();
      });
   }

   public loadCameras() {
      this.cameraServiceProvider.getAll(this.serverAddress)
         .then(data => {
            this.cameras = data;
         });
   }

   public goToCamera(event: any, camera: any) {
      this.navCtrl.push(this.cameraPage, {
         cameraId: camera._id
      })
   }

}
