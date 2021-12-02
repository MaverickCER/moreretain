import { Component, Input } from "@angular/core";

@Component({
  selector: "mic-svg",
  templateUrl: "./mic.component.svg",
  styleUrls: ["./svg.component.css"]
})
export class MicSVGComponent {
  @Input() fillColor = "rgb(0, 0, 0)";
}
