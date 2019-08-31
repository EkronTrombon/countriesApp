import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {

  @Input() country: Country;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('Country: ', this.country);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
