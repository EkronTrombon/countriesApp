import { Component, ViewChild, OnInit } from '@angular/core';
import { Country } from '../../interfaces/interfaces';
import { CountriesService } from '../../services/countries.service';

declare var mapboxgl: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  @ViewChild('mapa', {static: true}) mapa;
  countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  async ngOnInit() {
    const infoCargada = await this.loadCountriesInfo();
    if (infoCargada) {
      console.log(this.countries);
      this.loadMap();
    } else {
      // Info no cargada
    }
  }

  loadCountriesInfo() {
    return new Promise(resolve => {
      this.countriesService.getCountries().subscribe((resp: Country[]) => {
        if (resp.length > 0) {
          this.countries = resp;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  loadMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWtyb24iLCJhIjoiY2p4YW1pdjJmMTRteDN4cDdtcjJoMmR1MiJ9.YZgr-ibXNrLM_PHejdmzBg';
    var map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ this.countries[239].latlng[1], this.countries[239].latlng[0] ],
      zoom: 1
    });

    map.on('load', () => {
      map.resize();
      
      for (const country of this.countries) {
        if (country.latlng.length > 0) {
          this.setMarker(map, country);
        }
      }
      
      // Add zoom and rotation controls to the map.
      map.addControl(new mapboxgl.NavigationControl());
    });
  }

  setMarker(map: any, country: Country) {
    const html = `<h4>${country.name} <small>(${country.capital})</small></h4>`;
    return new mapboxgl.Marker().setLngLat([ Number(country.latlng[1]), Number(country.latlng[0]) ])
                                .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(html))
                                .addTo(map);
  }

  openCountryInfo(country) {
    console.log('Hola!');
  }

}
