import { Component, Input } from "@angular/core";

@Component({
  selector: "pay-svg",
  templateUrl: "./pay.component.svg",
  styleUrls: ["./svg.component.css"]
})
export class PaySVGComponent {
  @Input() fillColor = "rgb(0, 0, 0)";
}
