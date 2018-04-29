import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AreaServiceProvider {

   public serverAddress: String
   constructor(public http: Http) {
      
   }

   getAll(serverAddress: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/areas')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   getByFloor(serverAddress: String, floorId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/floors/' + floorId + '/areas')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   get(serverAddress: String, areaId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/areas/' + areaId)
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

}
