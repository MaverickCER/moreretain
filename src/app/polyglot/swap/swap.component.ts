import { Component, Input, Output, EventEmitter } from "@angular/core";
import { GoogleService } from "../services/google/google.services";

@Component({
  selector: "swap",
  templateUrl: "./swap.component.html",
  styleUrls: ["./swap.component.less"],
  providers: [GoogleService]
})
export class SwapComponent {
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

  switch() {
    let tempLang = this.GoogleObj.source;
    let tempVoice = this.GoogleObj.voice0;
    let tempResult = this.GoogleObj.result;
    this.GoogleObj.source = this.GoogleObj.target;
    this.GoogleObj.target = tempLang;
    this.GoogleObj.voice0 = this.GoogleObj.voice1;
    this.GoogleObj.voice1 = tempVoice;
    this.GoogleObj.result = this.GoogleObj.q;
    this.GoogleObj.q = tempResult;
  }
}
