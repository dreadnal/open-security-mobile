import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SensorTypeServiceProvider {

   constructor(public http: Http) {

   }

   getAll(serverAddress: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/sensorTypes')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   get(serverAddress: String, sensorTypeId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/sensorTypes/' + sensorTypeId)
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

}
