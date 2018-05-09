import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
import { AreaServiceProvider } from '../../providers/area-service/area-service';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { SensorServiceProvider } from '../../providers/sensor-service/sensor-service';
import { CameraServiceProvider } from '../../providers/camera-service/camera-service';

@IonicPage()
@Component({
  selector: 'page-area',
  templateUrl: 'area.html',
})
export class AreaPage {

  public area: any;
  public events: any;
  public sensors: any;
  public cameras: any;

  private area_id: Number;

  ionViewWillEnter() {
    this.common.get_settings(this.storage).then( values => {

      if (!values[0]) {
        this.common.logout(this.storage, this.navCtrl);
        return;
      }

      this.areaService.get(values[1], values[2], this.area_id).then(
        data => {
          this.area = data;
          this.getEvents(values[1], values[2], this.area_id);
          this.getSensors(values[1], values[2], this.area_id);
          this.getCameras(values[1], values[2], this.area_id);
        },
        error => { this.common.handle_errors(this.storage, this.navCtrl, error)}
      );
    });
  }

  private getEvents(server_address: string, api_key: string, area_id: Number) {
    this.eventService.getUnreadByArea(server_address, api_key, area_id).then(
      data => {
        console.log(data);
        this.events = data;
      },
      error => { this.common.handle_errors(this.storage, this.navCtrl, error)}
    );
  }

  private getSensors(storage: Storage, navCtrl: NavController, area_id: Number) {

  }

  private getCameras(storage: Storage, navCtrl: NavController, area_id: Number) {

  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage,
    private common: CommonServiceProvider,
    private areaService: AreaServiceProvider,
    private eventService: EventServiceProvider,
    private sensorService: SensorServiceProvider,
    private cameraService: CameraServiceProvider) {
      this.area_id = navParams.get('area_id');
  }
}
