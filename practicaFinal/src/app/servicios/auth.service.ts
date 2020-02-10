import { UserInterface } from './../entidad/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  registerUser(email: string, pass: string) {
    // tslint:disable-next-line: no-shadowed-variable
    return new  Promise ((resolve, reject ) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass).
      then(userData => {
         resolve (userData), this.updateUserDate(userData.user); })
      .catch(err => {reject(err), alert(err.message); });
    });
  }
  loginEmailUser(email: string, pass: string) {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject ) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData), err => {reject(err), alert(err.message); });
    });
  }
  loginFacebookUser() {
   return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
   .then((credential) => {
     this.updateUserDate(credential.user);
   });

  }
  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then((credential) => {
      this.updateUserDate(credential.user);
    });


  }
  logoutUser() {
    return this.afsAuth.auth.signOut();
  }

  isAuth() {
    // tslint:disable-next-line: no-shadowed-variable
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

private updateUserDate(user) {
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  console.log('updateUserData');
  const data: UserInterface = {
    id : user.uid,
    email: user.email,

  };
  console.log('user');
  return userRef.set(data, {merge: true});
}

}
