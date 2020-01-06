import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Country } from '../interfaces/interfaces';

const URL = environment.URL_COUNTRIES;

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return new Promise<Country[]>((resolve, reject) => {
      this.http.get(`${URL}/all`).subscribe((resp: Country[]) => {
        if (resp) {
          resolve(resp);
        } else {
          reject(true);
        }
      });
    });
  }

  getCountryByCode(code: string) {
    return new Promise<Country>((resolve, reject) => {
      this.http.get(`${URL}/alpha/${code}`).subscribe((resp: Country) => {
        if (resp) {
          resolve(resp);
        } else {
          reject(true);
        }
      });
    });
  }

  searchCountries(key: string) {
    return new Promise<Country[]>((resolve, reject) => {
      this.http.get(`${URL}/name/${key}`).subscribe((resp: Country[]) => {
        if (resp) {
          resolve(resp);
        } else {
          reject(true);
        }
      });
    });
  }

  getCountriesCapitals() {
    return this.http.get(`${URL}/all?fields=flag;name;capital`);
  }

  getAllCapitals() {
    return this.http.get(`${URL}/all?fields=capital`);
  }
}
