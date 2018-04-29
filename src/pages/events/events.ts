import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { EventPage } from '../event/event';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
   selector: 'page-events',
   templateUrl: 'events.html',
   providers: [EventServiceProvider]
})
export class EventsPage {

   public events: any;
   public segment: String;

   eventPage = EventPage;

   ionViewWillEnter() {
      if (this.serverAddress) {
         this.segment = "new";
         this.loadEvensts();
      }
   }

   public serverAddress: String
   constructor(public navCtrl: NavController, public navParams: NavParams,
      public eventServiceProvider: EventServiceProvider, public storage: Storage) {
      storage.get('serverAddressWithKey').then((val) => {
         if (val) {
            this.serverAddress = val;
         } else {
            this.serverAddress = "";
         }
         this.segment = "new";
         this.loadEvensts();
      });
   }

   public segmentChanged(event: any) {
      this.loadEvensts();
   }

   loadEvensts() {
      if (this.segment == "new") {
         this.eventServiceProvider.getNew(this.serverAddress)
            .then(data => {
               this.events = data;
            });
      } else {
         this.eventServiceProvider.getRead(this.serverAddress)
            .then(data => {
               this.events = data;
            });
      }
   }

   public goToEvent(event: any) {
      this.navCtrl.push(this.eventPage, {
         eventId: event._id
      });
   }

}
