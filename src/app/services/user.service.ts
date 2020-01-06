import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UiService } from './ui.service';
import { User } from '../interfaces/interfaces';
import { StorageService } from './storage.service';

const URL = environment.URL_REST;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private uiService: UiService,
              private storageService: StorageService) {}

  login(userName: string, password: string) {
    const url = URL + '/user/login';
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, { userName, password }).subscribe((resp: any) => {
        if (resp.ok) {
          resolve(resp);
          // Save data in Storage
          this.storageService.saveLoginRegisterData(resp.token);
        } else {
          reject(resp.message);
          this.uiService.showAlert('Login error!', resp.message);
          this.storageService.removeStorage();
        }
      });
    });
  }

  register(user: User) {
    const url = URL + '/user/create';
    return new Promise<string>((resolve, reject) => {
      this.http.post(url, user).subscribe((resp: any) => {
        if (resp.ok) {
          resolve(resp.token);
          // Save data in Storage
          this.storageService.saveLoginRegisterData(resp.token);
        } else {
          reject(resp.message);
          this.uiService.showAlert('Register error!', resp.message);
          this.storageService.removeStorage();
        }
      });
    });
  }

  async updateUser(updatedUser: User, userId: string) {
    const token = await this.storageService.getTokenFromStorage();
    const headers = { 'token': token };
    const url = URL + `/user/update/${userId}`;
    return new Promise((resolve, reject) => {
      this.http.post(url, updatedUser, { headers }).subscribe((resp: any) => {
        if (resp.ok) {
          resolve(resp.user);
          // this.storageService.saveLoginRegisterData(token);
        } else {
          reject(resp.message);
          this.uiService.showAlert('Updating error!', resp.message);
        }
      });
    });
  }
}
