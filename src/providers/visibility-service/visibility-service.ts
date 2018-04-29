import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VisibilityServiceProvider {

   constructor(public http: Http) {

   }

   getAll(serverAddress: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/visibilities')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   getByCamera(serverAddress: String, cameraId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/cameras/' + cameraId + '/visibilities')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   getBySensor(serverAddress: String, sensorId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/sensors/' + sensorId + '/visibilities')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   get(serverAddress: String, visibilityId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/visibilities/' + visibilityId)
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

}
