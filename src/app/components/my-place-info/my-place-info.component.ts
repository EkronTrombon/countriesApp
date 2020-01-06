import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MyPlace } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { UiService } from '../../services/ui.service';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';

declare var mapboxgl: any;
declare var window: any;

@Component({
  selector: 'app-my-place-info',
  templateUrl: './my-place-info.component.html',
  styleUrls: ['./my-place-info.component.scss'],
})
export class MyPlaceInfoComponent implements OnInit {

  @ViewChild('mapMyPlace', {static: true}) mapMyPlace;
  myPlace: MyPlace = {
    note: 0,
    date: new Date()
  };
  tempImages: string[] = [];

  constructor(private modalCtrl: ModalController,
              private geolocation: Geolocation,
              private camera: Camera,
              private firebaseService: FirebaseService,
              private uiService: UiService) { }

  async ngOnInit() {
    const geolocationLoaded = await this.geolocation.getCurrentPosition();
    if (geolocationLoaded) {
      this.loadMap(geolocationLoaded.coords.latitude, geolocationLoaded.coords.longitude);
      this.myPlace.lat = geolocationLoaded.coords.latitude;
      this.myPlace.lng = geolocationLoaded.coords.longitude;
    }
  }

  loadMap(lat: number, lng: number) {
    // console.log(this.myPlace);
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWtyb24iLCJhIjoiY2p4YW1pdjJmMTRteDN4cDdtcjJoMmR1MiJ9.YZgr-ibXNrLM_PHejdmzBg';
    const map = new mapboxgl.Map({
      container: this.mapMyPlace.nativeElement,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [ lng, lat ],
      zoom: 6
    });

    const marker = new mapboxgl.Marker({ draggable: false }).setLngLat([lng, lat]).addTo(map);

    map.on('load', () => {
      map.resize();
      map.addControl(new mapboxgl.NavigationControl());
    });
  }

  addMyPlace(fmyPlace: NgForm) {
    if (fmyPlace.valid) {
      this.myPlace.title = fmyPlace.value.title;
      this.myPlace.desc = fmyPlace.value.desc;
      this.myPlace.note = fmyPlace.value.note;
      console.log(this.myPlace);
      this.firebaseService.addMyPlace(this.myPlace).then(resp => {
        console.log(resp);
        this.uploadFile();
        this.uiService.presentToast('Your place has been saved!');
        this.closeModal();
      });
    } else {
      console.log('The form is not valid!');
    }
  }

  uploadFile() {
    console.log(this.tempImages);
    this.tempImages.forEach(async img => {
      const imgSubida = await this.firebaseService.uploadFile(img);
    });
  }

  cam() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.imageProccess(options);
  }

  gallery() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.imageProccess(options);
  }

  imageProccess(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // const img = window.Ionic.WebView.convertFileSrc(imageData);
      this.tempImages.push(imageData);
      console.log(this.tempImages);
      // this.postService.subirImagen(imageData);
     }, (err) => {
      // Handle error
     });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
