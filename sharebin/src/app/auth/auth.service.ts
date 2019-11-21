import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  userId: string;
  loggedIn: string;

  constructor(private http: HttpClient) { }

  setUser(userId: string) {
    this.userId = userId;
    this.isAuthenticated = true;
  }

  unsetUser() {
    // this.userId = null;
    // this.isAuthenticated = false;
  }

  getUser() {
    return this.userId;
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    );
  }

  login(email: string, password: string) {
    //firebase login API here
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    );
  }

  logout() {
    //firebase logout API here
    this.isAuthenticated = false;
    console.log(this.isAuthenticated);
  }
}
