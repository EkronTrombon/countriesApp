import { Component, OnInit } from '@angular/core';
import { User, Country } from '../../interfaces/interfaces';
import { StorageService } from '../../services/storage.service';
import { CountriesService } from 'src/app/services/countries.service';
import { UserService } from 'src/app/services/user.service';
import { UiService } from 'src/app/services/ui.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User = {};
  countries: Country[] = [];
  userCountry: Country;

  constructor(private storageService: StorageService,
              private countriesService: CountriesService,
              private userService: UserService,
              private uiService: UiService,
              private router: Router) {}

  async ngOnInit() {
    this.user = await this.storageService.getUserFromToken();
    this.countries = await this.countriesService.getCountries();
    this.userCountry = await this.countriesService.getCountryByCode(this.user.country);
  }

  async userUpdate(userForm: NgForm) {
    if (userForm.invalid) {
      // Invalid form alert
      this.uiService.showAlert('Action required!', 'All the user info is required');
    } else {
      const updatedUser: User = {
        name: userForm.value.name,
        lastName: userForm.value.lastName,
        userName: userForm.value.userName,
        country: userForm.value.country,
        // img: 'xxxxx.jpg' -TODO- UPDATE USER IMAGE!!
      };
      const resp = await this.userService.updateUser(updatedUser, this.user._id);
      this.uiService.presentToast('User updated!');
    }
  }

  logOut() {
    this.storageService.removeStorage();
    this.router.navigate(['/login']);
  }

}
