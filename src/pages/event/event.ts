import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
   selector: 'page-event',
   templateUrl: 'event.html',
   providers: [EventServiceProvider]
})
export class EventPage {

   public event: any;

   public serverAddress: String
   constructor(public navCtrl: NavController, public navParams: NavParams,
      public eventServiceProvider: EventServiceProvider, public storage: Storage) {
         storage.get('serverAddressWithKey').then((val) => {
            if (val) {
               this.serverAddress = val;
            } else {
               this.serverAddress = "";
            }
            let eventId = navParams.get('eventId')
            if (eventId == undefined) {
               navCtrl.pop();
            } else {
               this.loadEventData(eventId);
            }
         });
   }

   loadEventData(eventId: any) {
      this.eventServiceProvider.get(this.serverAddress, eventId)
         .then(data => {
            this.event = data[0];
         });
   }

   public markAsRead() {
      this.eventServiceProvider.markAsRead(this.serverAddress, this.event._id);
      this.event.state = 'read';
   }

   public markAsUnread() {
      this.eventServiceProvider.markAsUnread(this.serverAddress, this.event._id);
      this.event.state = 'new';
   }

}
