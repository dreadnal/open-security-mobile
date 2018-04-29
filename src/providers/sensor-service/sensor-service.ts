import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SensorServiceProvider {

   constructor(public http: Http) {

   }

   getAll(serverAddress: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/sensors')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   getByArea(serverAddress: String, areaId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/areas/' + areaId + '/sensors')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   getByType(serverAddress: String, sensorTypeId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/sensorTypes/' + sensorTypeId + '/sensors')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   get(serverAddress: String, sensorId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/sensors/' + sensorId)
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

}
