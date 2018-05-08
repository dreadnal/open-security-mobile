import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
import { AreaServiceProvider } from '../../providers/area-service/area-service';

@IonicPage()
@Component({
  selector: 'page-area',
  templateUrl: 'area.html',
})
export class AreaPage {

  public area: any;

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
        },
        error => { this.common.handle_errors(this.storage, this.navCtrl, error)}
      );
    });
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage,
    private common: CommonServiceProvider,
    private areaService: AreaServiceProvider) {
      this.area_id = navParams.get('area_id');
  }
}
