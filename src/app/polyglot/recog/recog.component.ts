import { Component, Input, EventEmitter, Output } from "@angular/core";
import { SpeechRecognitionService } from "@kamiazya/ngx-speech-recognition";

@Component({
  selector: "recog",
  templateUrl: "./recog.component.html",
  providers: [SpeechRecognitionService]
})
export class RecogComponent {
  public started = false;
  @Input() content: string;
  @Input() voice: SpeechSynthesisVoice;
  @Output() contentChange = new EventEmitter<string>();

  constructor(private service: SpeechRecognitionService) {
    this.service.onstart = (e) => {
      this.started = true;
    };
    this.service.onresult = (e) => {
      if (this.content == null) {
        this.content = e.results[e.results.length - 1].item(0).transcript;
      } else {
        this.content = this.content + e.results[e.results.length - 1].item(0).transcript;
      }
    };
    this.service.onend = (e) => {
      this.content = this.content + " ";
      this.started = false;
      this.contentChange.emit(this.content)
    };
  }

  public start(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      this.service.lang = this.voice.lang;
    } catch (error) {
      return alert("Select Language");
    }
    this.service.continuous = false;
    this.service.start();
  }

  public stop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.service.stop();
  }
}
