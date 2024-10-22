import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PPS4AComponent } from 'src/app/sala/pps-4-a/pps-4-a.component';
import { PPS4BComponent } from 'src/app/sala/pps-4-b/pps-4-b.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PPS4AComponent,
    PPS4BComponent
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
