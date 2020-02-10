import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email = '';
public password = '';
public isError = false;
  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }


  onLogin(form: NgForm): void {
    if (form.valid) {
    this.authService.loginEmailUser(this.email, this.password)
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => {console.log('err', err.message);
                     this.onIsError();

  });

  } else {
    this.onIsError();

  }
  }

  onIsError(): void {
    this.isError = true;

    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
  onLoginGoogle(): void {
   this.authService.loginGoogleUser()
  .then((res) => {
    console.log('resUser', res );
    this.onLoginRedirect();
  }).catch(err => console.log('err', err.message));
  }
  onLoginFacebook(): void {
    this.authService.loginFacebookUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));
  }
  onLogout() {
    this.authService.logoutUser();
    this.router.navigate(['user/login']);
  }
  onLoginRedirect(): void {
    this.router.navigate(['']);
  }
}
