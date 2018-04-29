import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CameraServiceProvider {

   constructor(public http: Http) {

   }

   getAll(serverAddress: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/cameras')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   getByArea(serverAddress: String, areaId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/areas/' + areaId + '/cameras')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   get(serverAddress: String, cameraId: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/cameras/' + cameraId)
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

}
