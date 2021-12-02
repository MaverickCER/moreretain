import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  constructor(public auth: AngularFireAuth, private router: Router) {
  }
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((res) => {
      this.router.navigateByUrl('/dashboard')
    });
  }
}