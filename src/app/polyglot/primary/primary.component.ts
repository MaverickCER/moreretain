import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "primary",
  templateUrl: "./primary.component.html",
  styleUrls: ["./primary.component.less"]
})
export class PrimaryComponent {
  GoogleObj: any = {};
  @Output() googleObjChange = new EventEmitter<number>();

  @Input()
  get googleObj() {
    return this.GoogleObj;
  }

  set googleObj(value) {
    this.GoogleObj = value;
    this.googleObjChange.emit(this.GoogleObj);
  }

  clear() {
    this.GoogleObj.q = "";
    this.GoogleObj.result = "";
    this.googleObjChange.emit(this.GoogleObj);
  }
}
