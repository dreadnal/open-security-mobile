import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CameraPage } from '../pages/camera/camera';
import { CamerasPage } from '../pages/cameras/cameras';
import { EventPage } from '../pages/event/event';
import { EventsPage } from '../pages/events/events';
import { LiveModePage } from '../pages/live-mode/live-mode';
import { SensorPage } from '../pages/sensor/sensor';
import { SensorsPage } from '../pages/sensors/sensors';
import { SettingsPage } from '../pages/settings/settings';
import { AreaServiceProvider } from '../providers/area-service/area-service';
import { CameraServiceProvider } from '../providers/camera-service/camera-service';
import { EventServiceProvider } from '../providers/event-service/event-service';
import { EventTypeServiceProvider } from '../providers/event-type-service/event-type-service';
import { FloorServiceProvider } from '../providers/floor-service/floor-service';
import { SensorServiceProvider } from '../providers/sensor-service/sensor-service';
import { SensorTypeServiceProvider } from '../providers/sensor-type-service/sensor-type-service';
import { VisibilityServiceProvider } from '../providers/visibility-service/visibility-service';
import { ThreeSceneComponent } from '../components/three-scene/three-scene'
import { SettingServiceProvider } from '../providers/setting-service/setting-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CameraPage,
    CamerasPage,
    EventPage,
    EventsPage,
    LiveModePage,
    SensorPage,
    SensorsPage,
    SettingsPage,
    ThreeSceneComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CameraPage,
    CamerasPage,
    EventPage,
    EventsPage,
    LiveModePage,
    SensorPage,
    SensorsPage,
    SettingsPage,
    ThreeSceneComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AreaServiceProvider,
    CameraServiceProvider,
    EventServiceProvider,
    EventTypeServiceProvider,
    FloorServiceProvider,
    SensorServiceProvider,
    SensorTypeServiceProvider,
    VisibilityServiceProvider,
    SettingServiceProvider
  ]
})
export class AppModule {}
