import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SettingServiceProvider {

   constructor(public http: Http) {

   }

   getAll(serverAddress: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/settings')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   get(serverAddress: String, settingName: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/settings/' + settingName)
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   enable(serverAddress: String, settingName: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/settings/' + settingName + '/enable')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   disable(serverAddress: String, settingName: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/settings/' + settingName + '/disable')
            .map(res => res.json())
            .subscribe(data => {
               resolve(data);
            });
      });
   }

   check(serverAddress: String) {
      return new Promise(resolve => {
         this.http.get(serverAddress + '/check')
            .map(res => res.json())
            .subscribe(
            data => {
               resolve(data);
            },
            err => {
               resolve({connect: false, auth: false})
            });
      });
   }
}
