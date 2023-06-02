import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { GoogleObj } from "src/app/models/googleobj.model";
import { SharedService } from "src/app/shared.service";

@Component({
  selector: "primarylang",
  templateUrl: "./primarylang.component.html",
  styleUrls: ["./primarylang.component.less"]
})
export class PrimarylangComponent implements OnInit{

  voices: SpeechSynthesisVoice[];
  googleObj: GoogleObj;
  primaryLang: FormControl;

  constructor(private sharedService: SharedService) {
    this.primaryLang = new FormControl();
    this.sharedService.googleObjSubject.subscribe((googleObj: GoogleObj) => {
      this.googleObj = googleObj;
      if(this.primaryLang.value === this.googleObj.voice0) {
        return;
      }
      this.primaryLang.setValue(this.googleObj.voice0);
    });
    this.sharedService.voicesSubject.subscribe((voices: SpeechSynthesisVoice[]) => this.voices = voices);
  }

  ngOnInit(): void {
    this.primaryLang.valueChanges.subscribe((primaryLanguage: SpeechSynthesisVoice) => {
      this.googleObj.voice0 = primaryLanguage;
      this.sharedService.googleObjSubject.next(this.googleObj);
    });
  }
}
