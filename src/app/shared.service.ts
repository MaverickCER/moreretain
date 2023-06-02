import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { GoogleObj } from './models/googleobj.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private userData: User;
  private voices: SpeechSynthesisVoice[];
  private googleObj: GoogleObj;

  public userDataSubject: BehaviorSubject<User>;
  public voicesSubject: BehaviorSubject<SpeechSynthesisVoice[]>;
  public googleObjSubject: BehaviorSubject<GoogleObj>;

  constructor() { 
    this.googleObj = {
      switch: false,
      format: "text",
      q: "",
      source: "en",
      target: "es",
      result: "",
      voice0: null,
      voice1: null,
      voices: []
    };
    this.userData =  {
      characters: 0,
      displayName: '',
      photoURL: '',
      uid: ''
    };
    this.voices = [];

    this.userDataSubject = new BehaviorSubject(this.userData);
    this.voicesSubject = new BehaviorSubject(this.voices);
    this.googleObjSubject = new BehaviorSubject(this.googleObj);
  }
}
