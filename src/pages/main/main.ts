import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CamerasPage } from '../cameras/cameras';
import { EventsPage } from '../events/events';
import { HomePage } from '../home/home';
import { SensorsPage } from '../sensors/sensors';
import { SettingsPage } from '../settings/settings';
import { CommonServiceProvider } from '../../providers/common-service/common-service'
import { Storage } from '@ionic/storage';
import { AreasPage } from '../areas/areas';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  areasPage = AreasPage;
  camerasPage = CamerasPage;
  eventsPage = EventsPage;
  homePage = HomePage;
  sensorsPage = SensorsPage;
  settingsPage = SettingsPage;

  ionViewWillEnter() {
    this.common.check_connection(this.storage, this.navCtrl);
  }

  constructor(private navCtrl: NavController, private storage: Storage,
    private common: CommonServiceProvider) {
      
  }
}
