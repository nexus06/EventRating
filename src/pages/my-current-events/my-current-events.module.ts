import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { MyCurrentEventsPage } from './my-current-events';

@NgModule({
  declarations: [
    MyCurrentEventsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCurrentEventsPage),
    TranslateModule.forChild()
  ],
  exports: [
    MyCurrentEventsPage
  ]
})
export class MyCurrentEventsPageModule {}
