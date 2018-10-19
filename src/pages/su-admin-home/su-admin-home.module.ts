import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuAdminHomePage } from './su-admin-home';

@NgModule({
  declarations: [
    SuAdminHomePage,
  ],
  imports: [
    IonicPageModule.forChild(SuAdminHomePage),
  ],
})
export class SuAdminHomePageModule {}
