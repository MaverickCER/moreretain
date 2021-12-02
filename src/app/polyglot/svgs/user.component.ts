import { Component, Input } from "@angular/core";

@Component({
  selector: "user-svg",
  templateUrl: "./user.component.svg",
  styleUrls: ["./svg.component.css"]
})
export class UserSVGComponent {
  @Input() fillColor = "rgb(0, 0, 0)";
}
