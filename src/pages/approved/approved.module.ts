import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApprovedPage } from './approved';

@NgModule({
  declarations: [
    ApprovedPage,
  ],
  imports: [
    IonicPageModule.forChild(ApprovedPage),
  ],
})
export class ApprovedPageModule {}
