import { Component, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private popover: PopoverController) { }

  ngOnInit() {}

  sel(val: string) {
    this.popover.dismiss(val);
  }

}
