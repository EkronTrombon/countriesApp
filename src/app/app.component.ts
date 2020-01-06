import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'World map',
      url: '/home',
      icon: 'globe'
    },
    {
      title: 'List of countries',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Capitals game',
      url: '/game',
      icon: 'help'
    },
    {
      title: 'My places',
      url: '/geolocation',
      icon: 'map'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService: StorageService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.checkLogin();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async checkLogin() {
    if (await this.storageService.checkTokenInStorage()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logOut() {
    this.storageService.removeStorage();
    this.router.navigate(['/login']);
  }
}
