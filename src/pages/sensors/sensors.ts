import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SensorServiceProvider } from '../../providers/sensor-service/sensor-service';
import { SensorPage } from '../sensor/sensor';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
   selector: 'page-sensors',
   templateUrl: 'sensors.html',
   providers: [SensorServiceProvider]
})
export class SensorsPage {

   public sensors: any;

   sensorPage = SensorPage;

   public serverAddress: String
   constructor(public navCtrl: NavController, public navParams: NavParams,
      public sensorServiceProvider: SensorServiceProvider, public storage: Storage) {
         storage.get('serverAddressWithKey').then((val) => {
            if (val) {
               this.serverAddress = val;
            } else {
               this.serverAddress = "";
            }
            this.loadSensors();
         });
   }

   loadSensors() {
      this.sensorServiceProvider.getAll(this.serverAddress)
         .then(data => {
            this.sensors = data;
         });
   }

   public goToSensor(event: any, sensor: any) {
      this.navCtrl.push(this.sensorPage, {
         sensorId: sensor._id
      });
   }

}
