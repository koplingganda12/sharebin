import { LoadingController, NavController } from '@ionic/angular';
import { AuthService, User } from 'src/app/auth/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  email: string;
  private usersCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;

  constructor(
    db: AngularFirestore,
    private authSvc: AuthService,
    private loadingController: LoadingController,
    private navController: NavController
  ) {
    this.usersCollection = db.collection<User>('users');

    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        });
      })
    );
  }

  addUser(user: User, id) {
    return this.usersCollection.doc(id).set(user);
  }

  getUser(email) {
    return this.usersCollection.doc<User>(email).valueChanges();
  }

  setImage(downloadURL) {
    var localStorageUid = localStorage.getItem('uid');
    firebase.database().ref('/users/' + localStorageUid).update( {image: downloadURL} );
  }
  
}
