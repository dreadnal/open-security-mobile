import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MainPage } from '../main/main';
import { DeviceServiceProvider } from '../../providers/device-service/device-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DeviceServiceProvider]
})
export class HomePage {

  _buttonText = 'Verify device';
  _buttonIsDisabled = false;

  public address: String;
  public id: String;
  public one_time_password: String;

  private mainPage = MainPage;
  
  ionViewWillEnter() {
    this.storage.get('verified').then((val) => {
      if (val && val == true) {
        this.navCtrl.setRoot(this.mainPage);
      }
    });
  }

  constructor(private navCtrl: NavController,
    private deviceServiceProvider: DeviceServiceProvider,
    private storage: Storage, private alertController: AlertController) {
  }

  public verify() {
    this._buttonText = 'Verifying device...';
    this._buttonIsDisabled = true;
    this.deviceServiceProvider.verify(this.address, this.id, this.one_time_password).then(
      data => {
        this.login(this.address, data);
      },
      error => {
        switch(error.status) {
          case 404 :
          case 403 : {
            this.alertVerificationFailed();
            break;
          }
          case 0 :
          default : {
            this.alertConnectionFailed();
            break;
          }
        }
        this._buttonText = 'Verify device';
        this._buttonIsDisabled = false;
      }
    );
  }

  private login(server_address: any, data: any) {
    this.storage.set('api_key', data['api_key']);
    this.storage.set('device_name', data['device_name']);
    this.storage.set('server_address', server_address);
    this.storage.set('verified', true);
    this.navCtrl.setRoot(this.mainPage);
  }

  private alertConnectionFailed() {
    let alert = this.alertController.create({
      title: 'Error',
      subTitle: 'Failed to connect server.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  private alertVerificationFailed() {
    let alert = this.alertController.create({
      title: 'Error',
      subTitle: 'Device verification failed.',
      buttons: ['Dismiss']
    });
    alert.present();
  } 
}
