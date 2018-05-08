import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/timeout';

@Injectable()
export class DeviceServiceProvider {

  constructor(private http: Http) {

  }

  verify(address: String, id: String, one_time_password: String) {

    var data : any = {};
    data.one_time_password = one_time_password;

    var uri = address + '/devices/'+ id +'/verify'

     return new Promise((resolve, reject) => {
        this.http.post(uri, data)
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
