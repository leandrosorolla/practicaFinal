import { NgForm } from '@angular/forms';
import { AuthService } from './../../../servicios/auth.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: AngularFireStorage
  ) {}
  @ViewChild('imageUser', { static: true }) inputImageUser: ElementRef;
  public email = '';
  public password = '';
  public isError = false;
  uploadPercent = new Observable<number>();
  urlImage: Observable<string>;

  ngOnInit() {}

  onUpload(e) {
    // console.log('subir', e);
    const id = Math.random()
      .toString(36)
      .substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.urlImage = ref.getDownloadURL())))
      .subscribe();
  }

  onAddUser() {

    this.authService
      .registerUser(this.email, this.password)
      .then(res => {
        this.authService.isAuth().subscribe(user => {
          if (user) {
            console.log('updateuser');
            user
              .updateProfile({

                displayName: '',
                //photoURL: this.inputImageUser.nativeElement.value
              })
              .then(() => {
                this.router.navigate(['']);
              })
              .catch(error => console.log('error', error));
          }
        });
      })
      .catch(err => console.log('err', err.message));
  }

  onLogin(form: NgForm): void {
    if (form.valid) {
      this.authService
        .loginEmailUser(this.email, this.password)
        .then(res => {
          this.onLoginRedirect();
          this.isError = false;
        })
        .catch(err => {
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
    this.authService
      .loginGoogleUser()
      .then(res => {
        console.log('resUser', res);
        this.onLoginRedirect();
      })
      .catch(err => console.log('err', err.message));
  }
  onLoginFacebook(): void {
    this.authService
      .loginFacebookUser()
      .then(res => {
        this.onLoginRedirect();
      })
      .catch(err => console.log('err', err.message));
  }

  onLoginRedirect(): void {
    this.router.navigate(['']);
  }
}
