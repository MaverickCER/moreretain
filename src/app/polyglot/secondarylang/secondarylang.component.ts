import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { GoogleObj } from "src/app/models/googleobj.model";
import { SharedService } from "src/app/shared.service";

@Component({
  selector: "secondarylang",
  templateUrl: "./secondarylang.component.html",
  styleUrls: ["./secondarylang.component.less"]
})
export class SecondarylangComponent implements OnInit {
  googleObj: GoogleObj;
  voices: SpeechSynthesisVoice[];
  secLang: FormControl;

  constructor(private sharedService: SharedService) {
    this.secLang = new FormControl();
    this.sharedService.googleObjSubject.subscribe((googleObj: GoogleObj) => {
      this.googleObj = googleObj;
      if(this.secLang.value === this.googleObj.voice1) {
        return;
      }
      this.secLang.setValue(this.googleObj.voice1);
    });
    this.sharedService.voicesSubject.subscribe((voices: SpeechSynthesisVoice[]) => this.voices = voices);
  }

  ngOnInit(): void {
    this.secLang.valueChanges.subscribe((secLanguage: SpeechSynthesisVoice) => {
      this.googleObj.voice1 = secLanguage;
      this.sharedService.googleObjSubject.next(this.googleObj);
    })
  }

}
