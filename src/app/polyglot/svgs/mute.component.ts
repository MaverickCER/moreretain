import { Component, Input } from "@angular/core";

@Component({
  selector: "mute-svg",
  templateUrl: "./mute.component.svg",
  styleUrls: ["./svg.component.css"]
})
export class MuteSVGComponent {
  @Input() fillColor = "rgb(0, 0, 0)";
}
