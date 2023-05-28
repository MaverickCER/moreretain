import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from "@angular/router";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  user: object = undefined;
  constructor(public readonly auth: AngularFireAuth, public db: AngularFireDatabase, private router: Router) {}

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      if (!user) {
        this.logout();
      }
      this.db.object(`users/${user.uid}`).valueChanges().subscribe(((userData: object) => {
        if (!userData) {
          this.logout();
        }
        this.user = userData;
      }));
    });
  }

  logout() {
    this.auth.signOut().then((res) => {
      this.router.navigateByUrl("/");
    });
  }
}
