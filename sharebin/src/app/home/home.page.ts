import { Component, OnInit } from '@angular/core';
// import { item } from './home.model';
import { Item, HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items: Item[];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getItems().subscribe(res => {
      this.items = res;
    });
  }

  remove(item) {
    this.homeService.removeItem(item.id);
  }

}
