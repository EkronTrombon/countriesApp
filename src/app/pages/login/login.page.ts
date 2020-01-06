import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UiService } from '../../services/ui.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/interfaces';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  slideOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };
  user: User = {};

  constructor(private router: Router,
              private uiService: UiService,
              private userService: UserService,
              private menuCtrl: MenuController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async login(form: NgForm) {
    if (form.invalid) {
      this.uiService.showAlert('Login error', 'The user/password are incorrect! Please, Sign Up...');
    } else {
      const resp: any = await this.userService.login(this.user.userName, this.user.password);
      console.log(resp.user);
      this.router.navigate(['/home']);
    }
  }

  goRegister() {
    this.router.navigate(['/register']);
  }

}
