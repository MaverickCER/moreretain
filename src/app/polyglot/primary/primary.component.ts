import { Component, Input, Output, EventEmitter } from "@angular/core";
import { GoogleObj } from "src/app/models/googleobj.model";
import { SharedService } from "src/app/shared.service";

@Component({
  selector: "primary",
  templateUrl: "./primary.component.html",
  styleUrls: ["./primary.component.less"]
})
export class PrimaryComponent {
  googleObj: GoogleObj;

  get q() {
    return this.googleObj.q;
  }

  set q(value) {
    this.googleObj.q = value;
    this.sharedService.googleObjSubject.next(this.googleObj);
  }

  constructor(private sharedService: SharedService) {
    this.sharedService.googleObjSubject.subscribe((googleObj: GoogleObj) => this.googleObj = googleObj);
  }

  clear() {
    this.googleObj.q = "";
    this.googleObj.result = "";
    this.sharedService.googleObjSubject.next(this.googleObj);
  }
}
