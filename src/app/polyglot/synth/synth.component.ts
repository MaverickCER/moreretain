import { Component, Input } from "@angular/core";
import {
  SpeechSynthesisUtteranceFactoryService,
  SpeechSynthesisService
} from "@kamiazya/ngx-speech-synthesis";

@Component({
  selector: "synth",
  templateUrl: "./synth.component.html",
  providers: [SpeechSynthesisUtteranceFactoryService]
})
export class SynthComponent {
  public playing = false;
  @Input() content: string;
  @Input() voice: any;

  constructor(
    public f: SpeechSynthesisUtteranceFactoryService,
    public svc: SpeechSynthesisService
  ) {}

  speech() {
    if (!this.content || this.content === "") return;
    this.svc.cancel();
    this.playing = true;
    this.f.voice = this.voice;
    this.svc.speak(this.f.text(this.content));
    let loop = setInterval(() => {
      if (!this.svc.speaking) {
        this.playing = false;
        clearInterval(loop);
      }
    }, 100);
  }

  cancel() {
    this.svc.cancel();
    this.playing = false;
  }
}
