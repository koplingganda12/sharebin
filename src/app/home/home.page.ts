import { Component, OnInit } from '@angular/core';
// import { item } from './home.model';
import { Item, HomeService } from './home.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  items: Item[];
  userId: string;
  srcKey: string;

  constructor(private homeService: HomeService,
    private alertController: AlertController,
    private authSvc: AuthService) { }

  // ionViewWillEnter() {
  //   this.homeService.getItems().subscribe(res => {
  //     this.items = res;
  //   });
  //   this.userId = this.authSvc.getUser();
  // }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    console.log("test");
    this.homeService.getItems().subscribe(res => {
      this.items = res;
    });
    this.userId = this.authSvc.getUser();
    console.log(this.userId);
  }

  // srcEvent() {
  //   this.homeService.getSearchKey();
  //   console.log("HOMEPAGE : " + this.homeService.getSearchKey());
  // }

  remove(item) {
    this.homeService.removeItem(item.id);
  }

  async presentAlert(item) {
    const alert = await this.alertController.create({
      header: 'Delete Item',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'YES',
          handler: () => this.remove(item)
        },
        {
          text: 'NO',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

}
