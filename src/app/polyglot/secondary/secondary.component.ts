import { Component, Input, Output, EventEmitter } from "@angular/core";
import { GoogleObj } from "src/app/models/googleobj.model";
import { SharedService } from "src/app/shared.service";

@Component({
  selector: "secondary",
  templateUrl: "./secondary.component.html",
  styleUrls: ["./secondary.component.less"]
})
export class SecondaryComponent {
  googleObj: GoogleObj;

  constructor(private sharedService: SharedService) {
    this.sharedService.googleObjSubject.subscribe((googleObj: GoogleObj) => this.googleObj = googleObj);
  }

  get result() {
    return this.googleObj.result;
  }

  set result(value) {
    this.googleObj.result = value;
    this.sharedService.googleObjSubject.next(this.googleObj);
  }

  clear() {
    this.googleObj.q = "";
    this.googleObj.result = "";
    this.sharedService.googleObjSubject.next(this.googleObj);
  }
}
