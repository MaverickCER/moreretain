import { Component, Input, OnInit } from "@angular/core";
import { SpeechSynthesisService } from "@kamiazya/ngx-speech-synthesis";
import { GoogleObj } from "../services/google/google.services";

@Component({
  selector: "nullary",
  templateUrl: "./nullary.component.html",
  styleUrls: ["./nullary.component.less"]
})
export class NullaryComponent implements OnInit {
  @Input() key: string;
  public googleObj: GoogleObj = new GoogleObj();
  voices = [];

  constructor(public svc: SpeechSynthesisService) {}

  ngOnInit(): void {
    this.voices = this.svc.getVoices();
    this.svc.onvoiceschanged = () => {
      this.voices = this.svc.getVoices();
    };
  }
}