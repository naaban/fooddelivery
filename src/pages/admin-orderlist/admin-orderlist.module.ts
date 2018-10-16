import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminOrderlistPage } from './admin-orderlist';

@NgModule({
  declarations: [
    AdminOrderlistPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminOrderlistPage),
  ],
})
export class AdminOrderlistPageModule {}
