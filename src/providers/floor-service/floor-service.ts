import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class FloorServiceProvider {

  constructor(private http: Http) {

  }

  getAll(address: string, api_key: string) {

    var uri = address + '/floors/';

    var headers = new Headers();
    headers.append('Authorization', api_key);

     return new Promise((resolve, reject) => {
        this.http.get(uri, {headers: headers})
           .timeout(10000) 
           .subscribe(res => {
              console.log(res);
              let data = res.json();
              resolve(data);
            }, (err) => {
              reject(err);
            });
     });
  }

  get(address: string, api_key: string, floor_id: Number) {

    var uri = address + '/floors/' + floor_id;

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
