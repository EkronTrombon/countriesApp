import { Component, OnInit, Input } from '@angular/core';
import { MyPlace } from '../../interfaces/interfaces';

@Component({
  selector: 'app-my-places',
  templateUrl: './my-places.component.html',
  styleUrls: ['./my-places.component.scss'],
})
export class MyPlacesComponent implements OnInit {

  @Input() myPlaces: MyPlace[] = [];

  constructor() { }

  ngOnInit() {
    console.log(this.myPlaces);
  }

}
