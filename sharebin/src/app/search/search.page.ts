import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  sampleArray = [];
  resultArray = [];

  constructor(
    public angularFirestore: AngularFirestore
  ) { }

  ngOnInit() {
  }

  search(event) {
    let searchKey:string = event.target.value;
    let firstLetter = searchKey.toUpperCase();

    if(searchKey.length == 0) {
      this.sampleArray = [];
      this.resultArray = [];
    }

    if(this.sampleArray.length == 0) {
      this.angularFirestore.collection('items', ref => ref.where('hashtag', '==', firstLetter)).snapshotChanges().subscribe(data => {
        data.forEach(childData => {
          this.sampleArray.push(childData.payload.doc.data())
        })
      })
    } else {
      this.resultArray = [];

      this.sampleArray.forEach(val => {
        let h:string = val['hashtag'];
        if(h.toUpperCase().startsWith(searchKey.toUpperCase())) {
          if(true) {
            this.resultArray.push(val);
          }
        }
      })
    }
  }

}
