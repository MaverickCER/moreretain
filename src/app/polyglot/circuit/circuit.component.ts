import { Component, Input } from "@angular/core";

@Component({
  selector: "circuit",
  templateUrl: "./circuit.component.html",
  styleUrls: ["./circuit.component.less"]
})
export class CircuitComponent {
  @Input() googleObj: any = {};
  @Input() user: any = {};
  @Input() voices: object[];
}
