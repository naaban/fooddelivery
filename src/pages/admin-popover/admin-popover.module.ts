import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminPopoverPage } from './admin-popover';

@NgModule({
  declarations: [
    AdminPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminPopoverPage),
  ],
})
export class AdminPopoverPageModule {}
