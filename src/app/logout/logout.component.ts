import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: "logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"]
})
export class LogoutComponent {
  constructor(public auth: AngularFireAuth, private router: Router) {}
  logout() {
    this.auth.signOut().then((res) => {
      this.router.navigateByUrl("/");
    });
  }
}
