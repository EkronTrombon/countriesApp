import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.URL_COUNTRIES;

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get(`${URL}/all`);
  }

  searchCountries(key: string) {
    return this.http.get(`${URL}/name/${key}`);
  }

  getCountriesCapitals() {
    return this.http.get(`${URL}/all?fields=flag;name;capital`);
  }

  getAllCapitals() {
    return this.http.get(`${URL}/all?fields=capital`);
  }
}
