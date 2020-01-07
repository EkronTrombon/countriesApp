import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespMyPlace } from '../interfaces/interfaces';

const URL = environment.URL_REST;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  page = 0;

  constructor(private http: HttpClient) {}

  getPosts(pull: boolean = false) {
    if (pull) {
      this.page = 0;
    }
    this.page ++;
    const url = URL + `/post?page=${this.page}`;
    return new Promise<RespMyPlace>((resolve, reject) => {
      this.http.get(url).subscribe((resp: any) => {
        if (resp.ok) {
          resolve(resp);
        } else {
          reject(resp.message);
        }
      });
    });
  }
}
