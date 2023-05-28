import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"]
})
export class HomepageComponent {
  constructor(public auth: AngularFireAuth, public db: AngularFireDatabase, private translate: TranslateService, private router: Router) {}
  login(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((res) => {
      if (res.user.metadata.creationTime === res.user.metadata.lastSignInTime) {
        this.db.list(`users`).set(res.user.uid, {
          characters: 1000,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
          uid: res.user.uid
        });
      }
      this.router.navigateByUrl('/dashboard')
    });
  }

  langC: string = "en";
  langN: string = "current";
  label: string = "greeting";
  link1: string = "link1";
  link2: string = "link2";
  text0: string = "text0";
  text1: string = "text1";
  text2: string = "text2";
  text3: string = "text3";
  text4: string = "text4";
  text5: string = "text5";
  text6: string = "text6";
  text7: string = "text7";
  text8: string = "text8";
  text9: string = "text9";
  text10: string = "text10";
  text11: string = "text11";
  text12: string = "text12";
  text13: string = "text13";
  text14: string = "text14";
  text15: string = "text15";
  text16: string = "text16";
  text17: string = "text17";
  text18: string = "text18";
  text19: string = "text19";
  text20: string = "text20";
  text21: string = "text21";
  text22: string = "text22";
  text23: string = "text23";
  text24: string = "text24";
  text25: string = "text25";
  text26: string = "text26";
  text27: string = "text27";
  text28: string = "text28";
  text29: string = "text29";

  ngOnInit() {
    this.onLanguage(this.langC);
  }

  onLanguage(lang) {
    this.langC = lang;
    this.translate.use(lang);
  }

  isHidden: boolean = true;

  toggle_menu() {
    this.isHidden = !this.isHidden;
  }
}
