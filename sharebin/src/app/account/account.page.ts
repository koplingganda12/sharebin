import { Component, OnInit } from '@angular/core';
import { HomeService, Item } from '../home/home.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  items: Item[];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getItems().subscribe(res => {
      this.items = res;
    });
  }

}
