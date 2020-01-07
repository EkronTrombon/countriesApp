import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { CountryComponent } from './country/country.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { UserUpdateComponent } from './user-update/user-update.component';
import { MyPlacesComponent } from './my-places/my-places.component';
import { PlaceComponent } from './place/place.component';
import { PopoverComponent } from './popover/popover.component';



@NgModule({
  declarations: [
    HeaderComponent,
    CountryComponent,
    UserUpdateComponent,
    MyPlacesComponent,
    PlaceComponent,
    PopoverComponent
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
    UserUpdateComponent,
    MyPlacesComponent,
    PlaceComponent
  ],
  entryComponents: [
    PopoverComponent
  ]
})
export class ComponentsModule { }
