import { Component, OnInit, Input } from '@angular/core';
import { MyPlace } from '../../interfaces/interfaces';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
})
export class PlaceComponent implements OnInit {

  mockImg1 = 'assets/img/story1.jpg';
  mockImg2 = 'assets/img/story2.jpg';
  mockImg3 = 'assets/img/story3.jpg';
  mockMap = 'assets/img/world.png';

  @Input() place: MyPlace = {};

  constructor(private popover: PopoverController) { }

  display = 'map';

  ngOnInit() {}

  async openPopover(event) {
    const popover = await this.popover.create({
      component: PopoverComponent,
      event,
      mode: 'ios',
      backdropDismiss: false
    });
    await popover.present();
    const {data} = await popover.onWillDismiss();
    this.display = data;
  }

}
