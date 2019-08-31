import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { CountryComponent } from './country/country.component';



@NgModule({
  declarations: [
    HeaderComponent,
    CountryComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    CountryComponent
  ]
})
export class ComponentsModule { }
