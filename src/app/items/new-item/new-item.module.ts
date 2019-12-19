import { FileSizeFormatPipe } from './file-size-format.pipe';
import { environment } from './../../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewItemPage } from './new-item.page';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

const routes: Routes = [
  {
    path: '',
    component: NewItemPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  declarations: [NewItemPage, FileSizeFormatPipe],
  providers: [AngularFirestore]
})
export class NewItemPageModule {}
