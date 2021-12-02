import { Component, Input } from "@angular/core";

@Component({
  selector: "copy-svg",
  templateUrl: "./copy.component.svg",
  styleUrls: ["./svg.component.css"]
})
export class CopySVGComponent {
  @Input() fillColor = "rgb(0, 0, 0)";
}
