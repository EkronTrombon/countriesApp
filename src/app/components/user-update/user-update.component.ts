import { Component, OnInit } from '@angular/core';
import { User, Country } from '../../interfaces/interfaces';
import { StorageService } from '../../services/storage.service';
import { NgForm } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { UserService } from '../../services/user.service';
import { UiService } from '../../services/ui.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {

  user: User = {};
  countries: Country[] = [];

  constructor(private storageService: StorageService,
              private countriesService: CountriesService,
              private userService: UserService,
              private uiService: UiService,
              private modalCtrl: ModalController) {}

  async ngOnInit() {
    this.user = await this.storageService.getUserFromToken();
    this.countries = await this.countriesService.getCountries();
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
      this.modalCtrl.dismiss();
    }
  }

}
