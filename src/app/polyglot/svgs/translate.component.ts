import { Component, Input } from "@angular/core";

@Component({
  selector: "translate-svg",
  templateUrl: "./translate.component.svg",
  styleUrls: ["./svg.component.css"]
})
export class TranslateSVGComponent {
  @Input() fillColor = "rgb(0, 0, 0)";
}
