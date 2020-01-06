import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  user: User = {};

  constructor(private storageService: StorageService,
              private modalCtrl: ModalController) { }

  async ngOnInit() {
    this.user = await this.storageService.getUserFromToken();
  }

  async openUserUpdate() {
    const modal = await this.modalCtrl.create({
      component: UserUpdateComponent,
      cssClass: 'userUpdate-modal',
    });
    return await modal.present();
  }

}
