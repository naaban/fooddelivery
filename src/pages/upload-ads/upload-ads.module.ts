import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadAdsPage } from './upload-ads';

@NgModule({
  declarations: [
    UploadAdsPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadAdsPage),
  ],
})
export class UploadAdsPageModule {}
