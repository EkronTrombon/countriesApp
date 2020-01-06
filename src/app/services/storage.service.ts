import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const URL = environment.URL_REST;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  token: string;

  constructor(private storage: Storage,
              private http: HttpClient) {}

  async checkTokenInStorage() {
    const token = await this.storage.get('token');
    if (token !== null) {
      return true;
    } else {
      return false;
    }
  }

  async saveLoginRegisterData(token: string) {
    this.token = token;
    await this.storage.set('token', this.token);
  }

  async getTokenFromStorage() {
    this.token = await this.storage.get('token');
    return this.token;
  }

  async getUserFromToken() {
    this.token = await this.storage.get('token');
    const url = URL + '/user';
    const headers = { 'token': this.token };
    return new Promise<User>((resolve, reject) => {
      this.http.get(url, { headers }).subscribe((resp: any) => {
        if (resp.ok) {
          resolve(resp.user);
        } else {
          reject(resp.message);
        }
      });
    });
  }

  deleteLoginData() {
    this.token = '';
    this.storage.remove('token');
  }

  removeStorage() {
    this.token = '';
    this.storage.clear();
  }
}
