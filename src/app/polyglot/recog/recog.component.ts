import { Component, Input, EventEmitter, Output } from "@angular/core";
import { SpeechRecognitionService } from "@kamiazya/ngx-speech-recognition";

@Component({
  selector: "recog",
  templateUrl: "./recog.component.html",
  providers: [SpeechRecognitionService]
})
export class RecogComponent {
  public started = false;
  @Input("voice") language = {
    voiceURI: "Google US English",
    name: "Google US English",
    lang: "en-US",
    localService: false,
    default: true
  };
  _content: any = "";

  @Output() contentChange = new EventEmitter();

  @Input()
  get content() {
    return this._content;
  }

  set content(value: any) {
    this.contentChange.emit(value);
    this._content = value;
  }

  constructor(private service: SpeechRecognitionService) {
    this.service.onstart = (e) => {
      this.started = true;
    };
    this.service.onresult = (e) => {
      if (this.content == null) {
        this.content = e.results[e.results.length - 1].item(0).transcript;
      } else {
        this.content =
          this.content + e.results[e.results.length - 1].item(0).transcript;
      }
    };
    this.service.onend = (e) => {
      this.content = this.content + " ";
      this.started = false;
    };
  }

  public start() {
    try {
      this.service.lang = this.language.lang;
    } catch (error) {
      return alert("Select Language");
    }
    this.service.continuous = false;
    this.service.start();
  }

  public stop() {
    this.service.stop();
  }
}
