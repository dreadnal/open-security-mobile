import { ViewChild, Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThreeSceneComponent } from '../../components/three-scene/three-scene';
import { FloorServiceProvider } from '../../providers/floor-service/floor-service';
import { AreaServiceProvider } from '../../providers/area-service/area-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
   selector: 'page-live-mode',
   templateUrl: 'live-mode.html',
   providers: [FloorServiceProvider, AreaServiceProvider]
})
export class LiveModePage {

   @ViewChild('threescene')
   threescene: ThreeSceneComponent;
   liveModePage = LiveModePage;

   scope: string;
   oid: string;

   public floors: any
   public areas: any

   public area: any

   loaded: boolean;

   public serverAddress: String
   constructor(public navCtrl: NavController, public navParams: NavParams,
      public floorServiceProvider: FloorServiceProvider,
      public areaServiceProvider: AreaServiceProvider, public storage: Storage) {
      this.scope = navParams.get('scope');
      this.oid = navParams.get('oid');
      storage.get('serverAddressWithKey').then((val) => {
         if (val) {
            this.serverAddress = val;
         } else {
            this.serverAddress = "";
         }
         this.loadElements();
      });
   }

   ngAfterViewInit() {
      this.threescene.parentPage = this;
   }

   ionViewDidEnter() {
      this.threescene.startAnimation();
   }

   ionViewDidLeave() {
      this.threescene.stopAnimation();
   }

   loadElements() {
      this.loaded = true;
      switch (this.scope) {
         case "room":
            this.loadArea(this.oid);
            break;
         case "floor":
            this.loadAreas(this.oid);
            break;
         case "building":
         default:
            this.loadFloors();
            break;
      }
   }

   loadFloors() {
      this.floorServiceProvider.getAll(this.serverAddress)
         .then(data => {
            this.floors = data;
            this.threescene.clear();
            this.floors.forEach(element => {
               this.threescene.addFloor(element);
            });
         });
   }

   loadAreas(floorId: String) {
      this.areaServiceProvider.getByFloor(this.serverAddress, floorId)
         .then(data => {
            this.areas = data;
            this.threescene.clear();
            this.areas.forEach(element => {
               this.threescene.addArea(element);
            });
         });
   }
   loadArea(areaId: String) {
      this.areaServiceProvider.get(this.serverAddress, areaId)
         .then(data => {
            this.area = data[0];
            this.threescene.clear();
            this.threescene.addArea(this.area);
         });
   }

}
