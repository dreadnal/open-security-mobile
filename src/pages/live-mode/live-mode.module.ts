import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiveModePage } from './live-mode';

@NgModule({
  declarations: [
    LiveModePage,
  ],
  imports: [
    IonicPageModule.forChild(LiveModePage),
  ],
})
export class LiveModePageModule {}
