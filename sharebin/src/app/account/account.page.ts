import { user } from './../home/home.model';
import { AuthService, User} from 'src/app/auth/auth.service';
import { AccountService} from './account.service';
import { Component, OnInit } from '@angular/core';
import { HomeService, Item } from '../home/home.service';
import * as firebase from 'firebase';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  email: string;
  user: User = {
    email: this.authSvc.getUserEmail(),
    name: '',
    address: '',
    phoneNumber: ''
  }

  constructor(
    private homeService: HomeService,
    private authSvc: AuthService,
    private alertController: AlertController,
    private accountService: AccountService,
    private loadingController: LoadingController,
    private navController: NavController
    ) { }

  ngOnInit() {
    this.loadUser();
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
  }
}
