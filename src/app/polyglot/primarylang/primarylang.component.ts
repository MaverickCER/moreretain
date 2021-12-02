import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "primarylang",
  templateUrl: "./primarylang.component.html",
  styleUrls: ["./primarylang.component.less"]
})
export class PrimarylangComponent {
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
  @Input() voices: object[];
}
