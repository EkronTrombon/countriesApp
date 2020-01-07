import { Component, OnInit } from '@angular/core';
import { MyPlace } from '../../interfaces/interfaces';
import { ModalController, MenuController } from '@ionic/angular';
import { PostService } from '../../services/post.service';
import { PlaceComponent } from '../../components/place/place.component';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit {

  myPlaces: MyPlace[] = [];
  infiniteScrollEnable = false;

  constructor(private modalCtrl: ModalController,
              private menuCtrl: MenuController,
              private postService: PostService) {}

  async ngOnInit() {
    this.loadPlaces();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  reload(event) {
    this.infiniteScrollEnable = false;
    this.myPlaces = [];
    this.loadPlaces(event, true);
  }

  async loadPlaces(event?, pull: boolean = false) {
    const resp = await this.postService.getPosts(pull);
    this.myPlaces.push(...resp.posts);
    if (event) {
      event.target.complete();
      if (resp.posts.length === 0) {
        this.infiniteScrollEnable = true;
      }
    }
  }

  async addMyPlace() {
    // const modal = await this.modalCtrl.create({
    //   component: PlaceComponent,
    //   // componentProps: {}
    // });
    // return await modal.present();
  }

}
