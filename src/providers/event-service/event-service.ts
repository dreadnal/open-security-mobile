import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventServiceProvider {

   constructor(public http: Http) {

   }

   getUnreadByArea(address: string, api_key: string, area_id: Number) {

      var uri = address + '/areas/' + area_id + '/events/unread';
  
      var headers = new Headers();
      headers.append('Authorization', api_key);
  
       return new Promise((resolve, reject) => {
          this.http.get(uri, {headers: headers})
             .timeout(10000) 
             .subscribe(res => {
                let data = res.json();
                resolve(data);
              }, (err) => {
                reject(err);
              });
       });
    }

}
