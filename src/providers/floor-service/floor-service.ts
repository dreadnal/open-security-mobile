import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FloorServiceProvider {

   constructor(public http: Http) {

   }

   getAll(serverAddress: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/floors')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   get(serverAddress: String, floorId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/floors/' + floorId)
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

}
