import { Component, Input, Output, EventEmitter } from "@angular/core";
import { GoogleService } from "../services/google/google.services";

@Component({
  selector: "trans",
  templateUrl: "./trans.component.html",
  styleUrls: ["./trans.component.less"],
  providers: [GoogleService]
})
export class TransComponent {
  @Input() key: string;
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
  constructor(private _google: GoogleService) {}

  translate() {
    let lang0 = this.GoogleObj.voice0.lang;
    let lang01 = lang0.substring(0, lang0.length - 3);
    this.GoogleObj.source = lang01;
    let lang1 = this.GoogleObj.voice1.lang;
    let lang11 = lang1.substring(0, lang1.length - 3);
    this.GoogleObj.target = lang11;
    if (this.GoogleObj.q !== undefined) {
      this._google.translate(this.GoogleObj, this.key).subscribe(
        (res: any) => {
          this.googleObj.result = res.data.translations[0].translatedText;
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
