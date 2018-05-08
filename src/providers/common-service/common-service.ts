import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { ReconnectPage } from '../../pages/reconnect/reconnect';

@Injectable()
export class CommonServiceProvider {

  private homePage = HomePage;
  private reconnectPage = ReconnectPage;

  constructor(private http: Http) {
    
  }

  get_settings(storage: Storage) {
    return Promise.all([storage.get('verified'), storage.get('server_address'), storage.get('api_key')])
  }

  logout(storage: Storage, navCtrl: NavController) {
    storage.clear();
    navCtrl.setRoot(this.homePage);
  }

  reconnect(navCtrl: NavController) {
    navCtrl.setRoot(this.reconnectPage);
  }

  check_connection(storage: Storage, navCtrl: NavController) {

    this.get_settings(storage).then(values => {
      if (!values[0]) {
        this.logout(storage, navCtrl);
        return;
      }
  
      var headers = new Headers();
      headers.append('Authorization', values[2]);
  
      var uri = values[1] + '/devices/check';

      new Promise((resolve, reject) => {
        this.http.get(uri, {headers: headers})
        .timeout(10000)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      }).then(
        data => {},
        error => { this.handle_errors(storage, navCtrl, error) });
    });
  }

  handle_errors(storage: Storage, navCtrl: NavController, error) {
    switch(error.status) {
      case 403 : {
        this.logout(storage, navCtrl);
        break;
      }
      case 0 :
      case 404 : 
      default : {
        this.reconnect(navCtrl);
        break;
      }
    }
  }
}
