import { AccountService } from './../account/account.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SignUpComponent } from './sign-up/sign-up.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  userId: string;

  constructor(
    private modalCtrl: ModalController, 
    private authSvc: AuthService, 
    private router: Router,
    private accountService: AccountService,
    private loadingController: LoadingController,
    private toastController : ToastController) { }


    async onClick() {
      const loading = await this.loadingController.create({
        message: "When you put the whole picture together. Recycling is the right thing to do",
        duration: 2450
      });
  
      await loading.present();
  
      const {role,data} = await loading.onDidDismiss();
      console.log('Loading Done');
    }
    
    async successToast() {
      const toast = await this.toastController.create({
        message: 'Welcome Back!',
        duration: 5000,
        showCloseButton: true
      });
      toast.present();
    }
    
    async failedToast() {
      const toast = await this.toastController.create({
        message: 'Invalid Email/Password',
        duration: 5000,
        showCloseButton: true
      });
      toast.present();
    }

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
          this.successToast();
        } else {
          console.log('Login failed!');
          this.failedToast();
        }
      },
      errosResp => {
        console.log(errosResp);
        this.failedToast();
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
