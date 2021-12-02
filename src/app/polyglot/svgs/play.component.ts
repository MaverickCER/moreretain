import { Component, Input } from "@angular/core";

@Component({
  selector: "play-svg",
  templateUrl: "./play.component.svg",
  styleUrls: ["./svg.component.css"]
})
export class PlaySVGComponent {
  @Input() fillColor = "rgb(0, 0, 0)";
}
