import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventTypeServiceProvider {

   constructor(public http: Http) {

   }

   getAll(serverAddress: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/eventTypes')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   get(serverAddress: String, eventTypeId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/eventTypes/' + eventTypeId)
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }
}
