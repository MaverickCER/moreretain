import { Component, Input } from "@angular/core";

@Component({
  selector: "repeat-svg",
  templateUrl: "./repeat.component.svg",
  styleUrls: ["./svg.component.css"]
})
export class RepeatSVGComponent {
  @Input() fillColor = "rgb(0, 0, 0)";
}
