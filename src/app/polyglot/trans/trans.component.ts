import { Component, Input, Output, EventEmitter } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { GoogleService } from "../services/google/google.services";

@Component({
  selector: "trans",
  templateUrl: "./trans.component.html",
  styleUrls: ["./trans.component.less"],
  providers: [GoogleService]
})
export class TransComponent {
  @Input() user: any = {};
  GoogleObj: any;
  @Output() googleObjChange = new EventEmitter<number>();

  @Input()
  get googleObj() {
    return this.GoogleObj;
  }

  set googleObj(value) {
    this.GoogleObj = value;
    this.googleObjChange.emit(this.GoogleObj);
  }
  constructor(public db: AngularFireDatabase, private _google: GoogleService) {}

  updateHistory(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') return;
    this.db.list(`history/${this.user.uid}/${this.GoogleObj.source}`).update(this.GoogleObj.target, { [key.toLowerCase()]: value.toLowerCase() });
    this.db.list(`history/${this.user.uid}/${this.GoogleObj.target}`).update(this.GoogleObj.source, { [value.toLowerCase()]: key.toLowerCase() });
  }

  translate() {
    let lang0 = this.GoogleObj.voice0.lang;
    let lang01 = lang0.substring(0, lang0.length - 3);
    this.GoogleObj.source = lang01;
    let lang1 = this.GoogleObj.voice1.lang;
    let lang11 = lang1.substring(0, lang1.length - 3);
    this.GoogleObj.target = lang11;
    if (this.GoogleObj.q !== undefined && this.GoogleObj.source !== this.GoogleObj.target) {
      this._google.translate(this.GoogleObj).subscribe(
        (res: any) => {
          this.googleObj.result = res.data.translations[0].translatedText;
          this.updateHistory(this.GoogleObj.q, this.googleObj.result);
        },
        (error) => {
          this.googleObj.result = error.message;
        }
      );
    } else {
      this.googleObj.result = "Nothing to Translate";
    }
  }
}
