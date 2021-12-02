import { Component, Input } from "@angular/core";

@Component({
  selector: "key-svg",
  templateUrl: "./key.component.svg",
  styleUrls: ["./svg.component.css"]
})
export class KeySVGComponent {
  @Input() fillColor = "rgb(0, 0, 0)";
}
