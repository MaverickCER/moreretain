import { Component, Input } from "@angular/core";

@Component({
  selector: "trash-svg",
  templateUrl: "./trash.component.svg",
  styleUrls: ["./svg.component.css"]
})
export class TrashSVGComponent {
  @Input() fillColor = "rgb(0, 0, 0)";
}
