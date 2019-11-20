import { item } from './../../home/home.model';
import { Item, HomeService } from './../../home/home.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.page.html',
  styleUrls: ['./new-item.page.scss'],
})
export class NewItemPage implements OnInit {

  item: Item = {
    name: '',
    address: '',
    description: '',
    imageUrl: '',
    userId: this.authSvc.getUser(),
    hashtag: ''
  };

  itemId = null;

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private navController: NavController,
    private authSvc: AuthService
  ) { }

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
