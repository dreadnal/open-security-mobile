import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SensorServiceProvider } from '../../providers/sensor-service/sensor-service'
import { EventServiceProvider } from '../../providers/event-service/event-service'
import { EventPage } from '../event/event';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
   selector: 'page-sensor',
   templateUrl: 'sensor.html',
   providers: [SensorServiceProvider, EventServiceProvider]
})
export class SensorPage {

   public sensor: any;
   public events: any;

   eventPage = EventPage;

   ionViewWillEnter() {
      if (this.sensor) {
         this.loadEvents();
      }
   }

   public serverAddress: String
   constructor(public navCtrl: NavController, public navParams: NavParams,
      public sensorServiceProvider: SensorServiceProvider,
      public eventServiceProvider: EventServiceProvider, public storage: Storage) {
      storage.get('serverAddressWithKey').then((val) => {
         if (val) {
            this.serverAddress = val;
         } else {
            this.serverAddress = "";
         }
         let sensorId = navParams.get('sensorId')
         if (sensorId == undefined) {
            navCtrl.pop();
         } else {
            this.loadSensorData(sensorId);
         }
      });
   }

   loadSensorData(sensorId: any) {
      this.sensorServiceProvider.get(this.serverAddress, sensorId)
         .then(data => {
            this.sensor = data[0];
            this.loadEvents();
         });
   }

   loadEvents() {
      this.eventServiceProvider.getBySensor(this.serverAddress, this.sensor._id)
         .then(data => {
            this.events = data;
         });
   }

   public goToEvent(event: any) {
      this.navCtrl.push(this.eventPage, {
         eventId: event._id
      });
   }

}
