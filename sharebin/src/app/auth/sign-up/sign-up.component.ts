import { AccountService } from './../../account/account.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService, User } from '../auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  // userId: string;
  user: User = {
    email: '',
    name: '',
    address: '',
    phoneNumber: ''
  };

  constructor(
    private modalCtrl: ModalController,
    private authSvc: AuthService,
    private accService: AccountService
    ) { }

  ngOnInit() {}

  onSignUp(f: NgForm) {
    console.log(f.value);
    this.authSvc.signup(f.value.email, f.value.pwd).subscribe(resp => {
      console.log(resp);
      this.user.email = f.value.email;
      this.user.name = f.value.name;
      this.user.address = f.value.address;
      this.user.phoneNumber = f.value.phoneNumber;
      this.accService.addUser(this.user, this.user.email);
      this.modalCtrl.dismiss();
    });
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }
}
