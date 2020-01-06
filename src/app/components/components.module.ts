import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { CountryComponent } from './country/country.component';
import { MyPlaceInfoComponent } from './my-place-info/my-place-info.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { UserUpdateComponent } from './user-update/user-update.component';



@NgModule({
  declarations: [
    HeaderComponent,
    CountryComponent,
    MyPlaceInfoComponent,
    UserUpdateComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    CountryComponent,
    MyPlaceInfoComponent,
    UserUpdateComponent
  ]
})
export class ComponentsModule { }
