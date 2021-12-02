import { Component, Input } from "@angular/core";

@Component({
  selector: "stop-svg",
  templateUrl: "./stop.component.svg",
  styleUrls: ["./svg.component.css"]
})
export class StopSVGComponent {
  @Input() fillColor = "rgb(0, 0, 0)";
}
