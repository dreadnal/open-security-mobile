import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
import { Storage } from '@ionic/storage';
import { FloorServiceProvider } from '../../providers/floor-service/floor-service';
import { AreaPage } from '../area/area';

@IonicPage()
@Component({
  selector: 'page-areas',
  templateUrl: 'areas.html',
})
export class AreasPage {

  public floors: any;
  private areaPage = AreaPage;

  ionViewWillEnter() {
    this.common.get_settings(this.storage).then( values => {

      if (!values[0]) {
        this.common.logout(this.storage, this.navCtrl);
        return;
      }

      this.floorService.getAll(values[1], values[2]).then(
        data => {
          this.floors = data;
          this.toggleFloor(0);
        },
        error => { this.common.handle_errors(this.storage, this.navCtrl, error)}
      );
    });
  }

  toggleFloor(i) {
    if (this.floors[i].open) {
      this.floors[i].open = false;
    } else {
      this.floors.forEach((floor, index) => {
        if (i == index) {
          floor.open = true;
        } else {
          floor.open = false;
        }
      });
    }
  }

  navigateArea(area: any) {
    this.navCtrl.push(this.areaPage, {area_id: area.id})
  }

  constructor(private navCtrl: NavController, private storage: Storage,
    private common: CommonServiceProvider,
    private floorService: FloorServiceProvider) {
      
  }

}
