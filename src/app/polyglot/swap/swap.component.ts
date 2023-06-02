import { Component, Input, Output, EventEmitter } from "@angular/core";
import { GoogleService } from "../services/google/google.services";
import { SharedService } from "src/app/shared.service";
import { GoogleObj } from "src/app/models/googleobj.model";

@Component({
  selector: "swap",
  templateUrl: "./swap.component.html",
  styleUrls: ["./swap.component.less"],
  providers: [GoogleService]
})
export class SwapComponent {
  
  googleObj: GoogleObj;

  constructor(private _google: GoogleService, private sharedService: SharedService) {
    this.sharedService.googleObjSubject.subscribe((googleObj: GoogleObj) => this.googleObj = googleObj);
  }

  switch() {
    let tempLang = this.googleObj.source;
    let tempVoice = this.googleObj.voice0;
    let tempResult = this.googleObj.result;
    this.googleObj.source = this.googleObj.target;
    this.googleObj.target = tempLang;
    this.googleObj.voice0 = this.googleObj.voice1;
    this.googleObj.voice1 = tempVoice;
    this.googleObj.result = this.googleObj.q;
    this.googleObj.q = tempResult;
    this.sharedService.googleObjSubject.next(this.googleObj);

  }
}
