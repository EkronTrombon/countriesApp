import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
import { CountriesService } from '../../services/countries.service';
import { Country, User } from '../../interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  slideOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };
  countries: Country[] = [];
  user: User = {};

  constructor(private router: Router,
              private uiService: UiService,
              private countriesService: CountriesService,
              private userService: UserService,
              private menuCtrl: MenuController) { }

  async ngOnInit() {
    this.countries = await this.countriesService.getCountries();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async register(registerForm: NgForm) {
    if (registerForm.invalid) {
      this.uiService.showAlert('Register error!', 'All the fields are required...');
    } else {
      const token = await this.userService.register(this.user);
      this.router.navigate(['/home']);
    }
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

}
