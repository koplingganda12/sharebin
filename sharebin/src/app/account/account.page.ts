import { AccountService } from './account.service';
import { Component, OnInit } from '@angular/core';
import { HomeService, Item } from '../home/home.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  items: Item[];

  constructor(private homeService: HomeService, private accService: AccountService) { }

  ngOnInit() {
    this.homeService.getItems().subscribe(res => {
      this.items = res;
    });
    this.accService.showEmail();
  }
  
  

}
