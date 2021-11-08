import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }
  
  signUp(email: string, password: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Successfully signed up!');
    })
    .catch(err => {
      console.log('Something is wrong: ', err.message);
    })
  }

  signIn(email:string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Successfully signed in!');
    })
    .catch(err => {
      console.log('Something is wrong: ', err.message);
    })
  }

  signOut() {
    this.angularFireAuth.signOut();
  }
}