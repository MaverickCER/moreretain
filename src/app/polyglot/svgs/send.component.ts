import { Component, Input } from "@angular/core";

@Component({
  selector: "send-svg",
  templateUrl: "./send.component.svg",
  styleUrls: ["./svg.component.css"]
})
export class SendSVGComponent {
  @Input() fillColor = "rgb(0, 0, 0)";
}
