import { Component, Input, Output, EventEmitter } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { GoogleService } from "../services/google/google.services";
import { User } from "src/app/models/user.model";
import { GoogleObj } from "src/app/models/googleobj.model";
import { SharedService } from "src/app/shared.service";

@Component({
  selector: "trans",
  templateUrl: "./trans.component.html",
  styleUrls: ["./trans.component.less"],
  providers: [GoogleService]
})
export class TransComponent {
  user: User;
  googleObj: GoogleObj;

  constructor(public db: AngularFireDatabase, private _google: GoogleService, private sharedService: SharedService) {
    this.sharedService.googleObjSubject.subscribe((googleObj: GoogleObj) => this.googleObj = googleObj);
    this.sharedService.userDataSubject.subscribe((user: User) => this.user = user);
  }

  updateHistory(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') return;
    this.db.list(`history/${this.user.uid}/${this.googleObj.source}`).update(this.googleObj.target, { [key.toLowerCase()]: value.toLowerCase() });
    this.db.list(`history/${this.user.uid}/${this.googleObj.target}`).update(this.googleObj.source, { [value.toLowerCase()]: key.toLowerCase() });
  }

  translate() {
    let lang0 = this.googleObj.voice0.lang;
    let lang01 = lang0.substring(0, lang0.length - 3);
    this.googleObj.source = lang01;
    let lang1 = this.googleObj.voice1.lang;
    let lang11 = lang1.substring(0, lang1.length - 3);
    this.googleObj.target = lang11;
    if (this.googleObj.q !== undefined && this.googleObj.source !== this.googleObj.target) {
      this._google.translate(this.googleObj).subscribe(
        (res: any) => {
          this.googleObj.result = res.data.translations[0].translatedText;
          this.updateHistory(this.googleObj.q, this.googleObj.result);
        },
        (error) => {
          this.googleObj.result = error.message;
        }
      );
    } else {
      this.googleObj.result = "Nothing to Translate";
    }
    this.sharedService.googleObjSubject.next(this.googleObj);
  }
}
