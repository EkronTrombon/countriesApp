import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { GameCountry } from '../../interfaces/interfaces';
import { UiService } from '../../services/ui.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  randomCountry: GameCountry = {};
  capitals = [];
  optCaps = [];

  constructor(private countriesService: CountriesService,
              private uiService: UiService,
              private menuCtrl: MenuController) { }

  ngOnInit() {
    this.initialize();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  async initialize() {
    this.randomCountry = {};
    this.capitals = [];
    this.optCaps = [];
    const loaded = await this.getRandomCountry();
    const capitalsLoaded = await this.getCapitals();
    this.setOptions();
  }

  setOptions() {
    for (const capi of this.capitals) {
      this.optCaps.push(capi.capital);
    }
    this.optCaps.push(this.randomCountry.capital);
    this.optCaps.sort(() => Math.random() - 0.5);
  }

  getRandomCountry() {
    return new Promise((resolve, reject) => {
      this.countriesService.getCountriesCapitals().subscribe((resp: GameCountry[]) => {
        if (resp.length > 0) {
          this.randomCountry = resp[Math.floor(Math.random() * resp.length)];
          resolve(true);
        } else {
          reject(true);
        }
      });
    });
  }

  getCapitals() {
    return new Promise((resolve, reject) => {
      this.countriesService.getAllCapitals().subscribe((resp: any) => {
        if (resp.length > 0) {
          for (let i = 0; i < 2; i++) {
            const element = resp[Math.floor(Math.random() * resp.length)];
            if (element !== '') {
              this.capitals.push(element);
            } else {
              this.capitals.push(resp[Math.floor(Math.random() * resp.length)]);
            }
          }
          // this.capitals.push(resp[Math.floor(Math.random() * resp.length)]);
          // this.capitals.push(resp[Math.floor(Math.random() * resp.length)]);
          resolve(true);
        } else {
          reject(true);
        }
      });
    });
  }

  validateAnswer(capi: string) {
    if (capi === this.randomCountry.capital) {
      this.uiService.showAlert('AWESOME!', 'The selected capital is correct');
    } else {
      this.uiService.showAlert('OH NO!', 'The selected capital is not correct');
    }
  }

  reload() {
    this.initialize();
  }

}
