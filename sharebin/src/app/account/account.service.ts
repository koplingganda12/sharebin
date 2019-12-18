import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  showEmail() {
    let user = firebase.auth().currentUser;
    let email, uid;

    if(user != null) {
      email = user.email;
      uid = user.uid;
      console.log("Email : " + email);
      console.log("Uid : " + uid);
    }
  }
}
