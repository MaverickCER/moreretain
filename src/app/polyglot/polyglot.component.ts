import { Component, Input } from "@angular/core";

@Component({
  selector: "polyglot",
  templateUrl: "./polyglot.component.html",
  styleUrls: ["./polyglot.component.less"]
})
export class PolyglotComponent {
  @Input() key: string = "";
}
