import { user } from './../home/home.model';
import { AuthService, User} from 'src/app/auth/auth.service';
import { AccountService} from './account.service';
import { Component, OnInit } from '@angular/core';
import { HomeService, Item } from '../home/home.service';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

defineCustomElements(window);

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  photo: SafeResourceUrl;
  email: string;

  user: User = {
    email: this.authSvc.getUserEmail(),
    name: '',
    address: '',
    phoneNumber: '',
    avatarUrl: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'
  }

  constructor(
    private homeService: HomeService,
    private authSvc: AuthService,
    private alertController: AlertController,
    private accountService: AccountService,
    private loadingController: LoadingController,
    private navController: NavController,
    private toastController : ToastController,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    this.loadUser();
  }

  async successToast() {
    const toast = await this.toastController.create({
      message: 'Success',
      duration: 3800,
      showCloseButton: true
    });
    toast.present();
  }

  async loadUser() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    this.email = this.authSvc.getUserEmail();
    console.log("email : " + this.email);

    this.accountService.getUser(this.email).subscribe(res => {
      loading.dismiss();
      this.user = res;
    });

    console.log(this.user);
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
    let name = this.authSvc.getUserEmail();
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
        this.user.avatarUrl = downloadURL;
        this.photo = downloadURL;
        return this.accountService.setImage(downloadURL);
      });
    });
  }

  async saveUser() {
    const loading = await this.loadingController.create({
      message: 'Saving user...'
    });
    await loading.present();

    this.email = this.authSvc.getUserEmail();
    console.log("email : " + this.email);

    this.accountService.addUser(this.user, this.email).then(() => {
      loading.dismiss();
      this.navController.navigateBack('home');
    })

    this.successToast();
  }
}
