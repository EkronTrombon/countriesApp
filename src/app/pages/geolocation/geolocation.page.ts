import { Component, OnInit } from '@angular/core';
import { MyPlace } from '../../interfaces/interfaces';
import { FirebaseService } from '../../services/firebase.service';
import { ModalController, MenuController } from '@ionic/angular';
import { MyPlaceInfoComponent } from '../../components/my-place-info/my-place-info.component';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit {

  myPlaces: MyPlace[] = [];

  constructor(private firebaseService: FirebaseService,
              private modalCtrl: ModalController,
              private menuCtrl: MenuController) {}

  ngOnInit() {
    this.firebaseService.getMyPlaces().subscribe(resp => {
      console.log(resp);
      this.myPlaces = resp;
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  async addMyPlace() {
    const modal = await this.modalCtrl.create({
      component: MyPlaceInfoComponent,
      // componentProps: {}
    });
    return await modal.present();
  }

}
