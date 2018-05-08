import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class AreaServiceProvider {

  constructor(private http: Http) {

  }

  getAll(address: string, api_key: string) {

    var uri = address + '/areas/';

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

  get(address: string, api_key: string, area_id: Number) {
    
    var uri = address + '/areas/' + area_id;

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
