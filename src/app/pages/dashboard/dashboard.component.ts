import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { SharedService } from "src/app/shared.service";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  user: User | undefined;
  constructor(public readonly auth: AngularFireAuth, public db: AngularFireDatabase, private router: Router, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      if (!user) {
        this.logout();
      }
      this.db.object(`users/${user.uid}`).valueChanges().subscribe(((userData: User) => {
        if (!userData) {
          this.logout();
        }
        userData.displayName = userData.displayName.split(' ')[0]
        this.user = userData;
        console.error(this.user);
        this.sharedService.userDataSubject.next(this.user);
      }));
    });
  }

  logout() {
    this.auth.signOut().then((res) => {
      this.router.navigateByUrl("/");
    });
  }
}
