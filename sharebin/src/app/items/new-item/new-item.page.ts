import { Item, HomeService } from './../../home/home.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import * as firebase from 'firebase';

defineCustomElements(window);

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.page.html',
  styleUrls: ['./new-item.page.scss'],
})
export class NewItemPage implements OnInit {
  photo: SafeResourceUrl;

  item: Item = {
    name: '',
    address: '',
    description: '',
    imageUrl: '',
    userId: this.authSvc.getUser(),
    hashtag: '',
    phoneNumber: ''
  };

  itemId = null;
  // private imageCollection: AngularFirestoreCollection<Item>;

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private navController: NavController,
    private authSvc: AuthService,
    private sanitizer: DomSanitizer
  ) {
    // this.isUploading = false;
    // this.isUploaded = false;
    // //Set collection where our documents/ images info will save
    // this.imageCollection = database.collection<Item>('items');
    // this.images = this.imageCollection.valueChanges();
  }

  ngOnInit() {
    this.itemId = this.route.snapshot.params['id'];
    if (this.itemId) {
      this.loadItem();
    }
  }

  async loadItem() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    this.homeService.getItem(this.itemId).subscribe(res => {
      loading.dismiss();
      this.item = res;
      this.photo = this.item.imageUrl;
    });
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.base64String));

    // Create a root reference
    var storageRef = firebase.storage().ref();

    // Create a reference to 'mountains.jpg'
    let name = this.authSvc.getUser();
    var date = new Date;
    var uploadRef = storageRef.child( name + date.getUTCDate() + date.getUTCDay() + date.getUTCMonth() + date.getUTCFullYear() + 
      date.getUTCHours() + date.getUTCMinutes() + date.getUTCSeconds() + '.jpg');

    // this.item.imageUrl = image.dataUrl;
    // console.log(this.item);

    return uploadRef
    .putString(image.base64String, 'base64', { contentType: 'image/png' })
    .then(() => {
      return uploadRef.getDownloadURL().then(downloadURL => {
        console.log(downloadURL);
        this.item.imageUrl = downloadURL;
        this.photo = downloadURL;
        return this.homeService.setImage(downloadURL);
      });
    });
  }

  async saveItem() {
    const loading = await this.loadingController.create({
      message: 'Saving item...'
    });
    await loading.present();

    if (this.itemId) {
      this.homeService.updateItem(this.item, this.itemId).then(() => {
        loading.dismiss();
        this.navController.navigateBack('home');
      })
    } else {
      this.homeService.addItem(this.item).then(() => {
        loading.dismiss();
        this.navController.navigateBack('home');
      });
    }
  }

}
