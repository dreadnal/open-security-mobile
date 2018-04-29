import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventServiceProvider {

   constructor(public http: Http) {

   }

   getAll(serverAddress: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/events')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   getNew(serverAddress: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/events/new')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   getRead(serverAddress: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/events/read')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   getByArea(serverAddress: String, areaId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/areas/' + areaId + '/events')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   getByType(serverAddress: String, eventTypeId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/eventTypes/' + eventTypeId + '/events')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   getBySensor(serverAddress: String, sensorId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/sensors/' + sensorId + '/events')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   get(serverAddress: String, eventId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/events/' + eventId)
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   markAsRead(serverAddress: String, eventId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/events/' + eventId + '/markAsRead')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   markAsUnread(serverAddress: String, eventId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/events/' + eventId + '/markAsUnread')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

}
