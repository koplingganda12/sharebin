import { Injectable } from '@angular/core';
import { item } from './home.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as firebase from 'firebase';

export interface Item {
  name: string;
  address: string;
  description: string;
  imageUrl: string;
  userId: string;
  hashtag: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  // private _items: item[] = [
  //   new item(
  //     'i1',
  //     'Kardus Bekas',
  //     'BSD',
  //     'Kardus bekas rokok',
  //     'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/4/23/0/0_080cc940-19b9-496b-b830-69f6b260032e_1217_956.jpg',
  //   ),
  //   new item(
  //     'i2',
  //     'Gelas Bekas',
  //     'BSD',
  //     'Gelas bekas artis',
  //     'https://image.indonetwork.co.id/products/thumbs/600x600/2014/12/01/95bc5303c9ab227b102498a8601aebf3.jpg',
  //   ),
  // ]

  // get getAllItems() {
  //   return [...this._items];
  // }

  private itemsCollection: AngularFirestoreCollection<Item>;
  private items: Observable<Item[]>;

  constructor(db: AngularFirestore) {
    this.itemsCollection = db.collection<Item>('items');

    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getItems() {
    return this.items;
  }

  getItem(id) {
    return this.itemsCollection.doc<Item>(id).valueChanges();
  }

  updateItem(item: Item, id: string) {
    return this.itemsCollection.doc(id).update(item);
  }

  addItem(item: Item) {
    return this.itemsCollection.add(item);
  }

  removeItem(id) {
    return this.itemsCollection.doc(id).delete();
  }

  setImage(downloadURL) {
    var localStorageUid = localStorage.getItem('uid');
    firebase.database().ref('/users/' + localStorageUid).update( {image: downloadURL} );
  }

  // searchResult(event) {
  //   let srcKey:string = event.target.value;
  //   console.log(srcKey + " service");
  // }

  // getSearchKey(){
  //   return this.searchResult;
  // }

}
