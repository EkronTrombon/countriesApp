import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GeolocationPage } from './geolocation.page';
import { ComponentsModule } from '../../components/components.module';
import { MyPlaceInfoComponent } from '../../components/my-place-info/my-place-info.component';

const routes: Routes = [
  {
    path: '',
    component: GeolocationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    GeolocationPage
  ],
  entryComponents: [
    MyPlaceInfoComponent
  ]
})
export class GeolocationPageModule {}
