import { Component, Input } from "@angular/core";

@Component({
  selector: "copy",
  templateUrl: "./copy.component.html"
})
export class CopyComponent {
  @Input() content: string = " ";
  copyText() {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = this.content;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }
}
