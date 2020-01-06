import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { MyPlace, MyImage } from '../interfaces/interfaces';
import { map, take, finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private myPlaces: Observable<MyPlace[]>;
  private myPlacesCollection: AngularFirestoreCollection<MyPlace>;

  // Upload Task
  private task: AngularFireUploadTask;
  // Progress in percentage
  private percentage: Observable<number>;
  // Snapshot of uploading file
  private snapshot: Observable<any>;
  // Uploaded File URL
  private uploadedFileURL: Observable<string>;
  // Uploaded Image List
  private images: MyImage[];

  private isUploading: boolean;
  private isUploaded: boolean;
  private fileName: string;
  private fileSize: number;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.isUploading = false;
    this.isUploaded = false;
    this.myPlacesCollection = this.afs.collection<MyPlace>('myPlaces');
    this.myPlaces = this.myPlacesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getMyPlaces(): Observable<MyPlace[]> {
    return this.myPlaces;
  }

  getMyPlace(id: string): Observable<MyPlace> {
    return this.myPlacesCollection.doc<MyPlace>(id).valueChanges().pipe(
      take(1),
      map(idea => {
        idea.id = id;
        return idea;
      })
    );
  }

  addMyPlace(myPlace: MyPlace): Promise<DocumentReference> {
    return this.myPlacesCollection.add(myPlace);
  }

  updateMyPlace(myPlace: MyPlace): Promise<void> {
    return this.myPlacesCollection.doc(myPlace.id).update({
      lat: myPlace.lat,
      lng: myPlace.lng,
      title: myPlace.title,
      date: myPlace.date
    });
  }

  deleteMyPlace(id: string): Promise<void> {
    return this.myPlacesCollection.doc(id).delete();
  }

  uploadFile(imageURI) {
    return new Promise<any>((resolve, reject) => {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child('image').child('imageName');
      this.encodeImageUri(imageURI, image64 => {
        imageRef.putString(image64, 'data_url').then(snapshot => {
          resolve(snapshot.downloadURL);
        }, err => {
          reject(err);
        });
      });
    });
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  }

  // uploadFile(event: FileList) {
  //   const file = event.item(0);
  //   // Validation for images only
  //   if (file.type.split('/')[0] !== 'image') {
  //     console.log('Unsupported file type!');
  //     return;
  //   }
  //   this.isUploading = true;
  //   this.isUploaded = false;
  //   this.fileName = file.name;
  //   const path = `countriesApp/${ new Date().getTime() }_${ this.fileName }`;
  //   const customMetadata = { app: 'Cuntries app Images' };
  //   const fileRef = this.storage.ref(path);
  //   this.task = this.storage.upload(path, file, { customMetadata });

  //   // Get file progress percentage
  //   this.percentage = this.task.percentageChanges();
  //   this.snapshot = this.task.snapshotChanges().pipe(finalize(() => {
  //       // Get uploaded file storage path
  //       this.uploadedFileURL = fileRef.getDownloadURL();
  //       this.uploadedFileURL.subscribe(resp => {
  //         this.addImagetoList({
  //           name: file.name,
  //           filepath: resp,
  //           size: this.fileSize
  //         });
  //         this.isUploading = false;
  //         this.isUploaded = true;
  //       }, error => {
  //         console.error(error);
  //       });
  //     }), tap(snap => {
  //         this.fileSize = snap.totalBytes;
  //     })
  //   );
  // }

  // addImagetoList(image: any) {
  //   this.images.push(image);
  // }
}
