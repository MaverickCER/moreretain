import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "secondary",
  templateUrl: "./secondary.component.html",
  styleUrls: ["./secondary.component.less"]
})
export class SecondaryComponent {
  @Input() googleObj: any = {};
  @Output() googleObjChange = new EventEmitter<object>();

  get result() {
    return this.googleObj.result;
  }

  set result(value) {
    this.googleObj.result = new String(value);
    this.googleObjChange.emit(this.googleObj);
  }

  clear() {
    this.googleObj.q = "";
    this.googleObj.result = "";
    this.googleObjChange.emit(this.googleObj);
  }
}
