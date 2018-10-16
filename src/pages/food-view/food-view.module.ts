import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodViewPage } from './food-view';

@NgModule({
  declarations: [
    FoodViewPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodViewPage),
  ],
})
export class FoodViewPageModule {}
