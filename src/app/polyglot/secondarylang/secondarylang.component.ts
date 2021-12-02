import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "secondarylang",
  templateUrl: "./secondarylang.component.html",
  styleUrls: ["./secondarylang.component.less"]
})
export class SecondarylangComponent {
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
