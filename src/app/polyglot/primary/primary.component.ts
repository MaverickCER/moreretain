import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "primary",
  templateUrl: "./primary.component.html",
  styleUrls: ["./primary.component.less"]
})
export class PrimaryComponent {
  @Input() googleObj: any = {};
  @Output() googleObjChange = new EventEmitter<object>();

  get q() {
    return this.googleObj.q;
  }

  set q(value) {
    this.googleObj.q = new String(value);
    this.googleObjChange.emit(this.googleObj);
  }

  clear() {
    this.googleObj.q = "";
    this.googleObj.result = "";
    this.googleObjChange.emit(this.googleObj);
  }
}
