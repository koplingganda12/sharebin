import { AccountService } from './../account/account.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SignUpComponent } from './sign-up/sign-up.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  userId: string;

  constructor(private modalCtrl: ModalController, private authSvc: AuthService, private router: Router,
    private accountService: AccountService) { }

  ngOnInit() {
    this.userId = this.authSvc.getUser();
  }

  onLogin(f: NgForm) {
    this.authSvc.login(f.value.email, f.value.pwd).subscribe(
      resp => {
        if (resp.idToken) {
          console.log(resp);
          this.authSvc.setUser(resp.localId);
          console.log("User ID: ", resp.localId);
          this.router.navigateByUrl('/home');
        } else {
          console.log('Login failed!');
        }
      },
      errosResp => {
        console.log(errosResp);
      }
    );
    this.authSvc.setUserEmail(f.value.email);
    //this.router.navigateByUrl('/home');
  }

  async presentSignUpModal() {
    const modal = await this.modalCtrl.create({
      component: SignUpComponent
    });
    return await modal.present();
  }

}
