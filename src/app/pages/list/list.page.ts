import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/interfaces/interfaces';
import { CountriesService } from 'src/app/services/countries.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { CountryComponent } from '../../components/country/country.component';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  countries: Country[] = [];
  
  constructor(private countriesService: CountriesService,
              private uiService: UiService,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController) {}

  async ngOnInit() {}

  loadCountriesInfo(key: string) {
    return new Promise(resolve => {
      this.countriesService.searchCountries(key).subscribe((resp: Country[]) => {
        if (resp.length > 0) {
          this.countries = resp;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  async search(event) {
    const key = event.detail.value;
    if (key !== '') {
      // Loading
      const loading = await this.loadingCtrl.create({
        message: 'Loding countries...'
      });
      await loading.present();
      // End loading
      // const info = await this.loadCountriesInfo(key);
      this.loadCountriesInfo(key).catch(err => {
        this.uiService.showAlert('No countries founded');
      });
      loading.dismiss();
    } else {
      this.countries = [];
    }
  }

  async openCountry(country: Country) {
    const modal = await this.modalCtrl.create({
      component: CountryComponent,
      componentProps: { 'country': country }
    });
    return await modal.present();
  }
}
