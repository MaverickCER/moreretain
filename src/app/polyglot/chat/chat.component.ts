import { Component } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { GoogleService } from "../services/google/google.services";
import { GoogleObj } from "src/app/models/googleobj.model";
import { User } from "src/app/models/user.model";
import { SharedService } from "src/app/shared.service";

@Component({
  selector: "chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.less"],
  providers: [GoogleService]
})
export class ChatComponent {
  googleObj: GoogleObj = {
    switch: false,
      format: "text",
      q: "",
      source: "en",
      target: "es",
      result: "",
      voice0: {lang: ''},
      voice1: {lang: ''},
      voices: []
  };
  messages = [];
  user: User;

  constructor(public db: AngularFireDatabase, private _google: GoogleService, private sharedService: SharedService) {
    // this.googleObj = this.sharedService.googleObjSubject.value;
    this.sharedService.googleObjSubject.subscribe((googleObj: GoogleObj) => {
      //Check if value of secondary language is changed or not.
      if (this.googleObj.voice1.lang !== (googleObj.voice1 ?? googleObj.voice1.lang)) {
        this.googleObj = {...googleObj};
        this.googleObj.target = googleObj.voice1.lang.slice(0, 2);
        this.getData();
      }
    });
    this.sharedService.userDataSubject.subscribe((userData: User) => {
      this.user = userData;
      this.getData();
    });
  }

  get result() {
    return this.googleObj.result;
  }

  set result(value) {
    this.googleObj.result = value;
    this.sharedService.googleObjSubject.next(this.googleObj);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    if (this.user && this.user.uid && this.googleObj && this.googleObj.source && this.googleObj.target) {
      this.db.list(`messages/${this.googleObj.target}`, ref => ref.orderByChild('createdAt').limitToLast(5)).valueChanges().subscribe(((messagesData: any) => {
        this.messages = messagesData;
      }));
    }
  }

  updateHistory(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') return;
    this.db.list(`history/${this.user.uid}/${this.googleObj.source}`).update(this.googleObj.target, { [key.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")]: value.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") });
    this.db.list(`history/${this.user.uid}/${this.googleObj.target}`).update(this.googleObj.source, { [value.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")]: key.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") });
  }

  reveal(index) {
    if (this.messages[index][this.googleObj.source]) {
      let localMessages = this.messages;
      localMessages[index].revealed = !localMessages[index].revealed;
      this.updateHistory(this.messages[index][this.googleObj.source], this.messages[index].message);
      return this.messages = localMessages;
    }

    let swappedObject = {
      ...this.googleObj,
      q: this.messages[index].message,
      source: this.googleObj.target,
      target: this.googleObj.source
    }
    this._google.translate(swappedObject).subscribe(
      (res: any) => {
        let translation = res.data.translations[0].translatedText;
        let localMessages = this.messages;
        this.db.list(`messages/${this.googleObj.target}`).update(this.messages[index].key, { [this.googleObj.source]: translation });
        this.db.list(`users`).update(this.user.uid, { 'characters': this.user.characters - this.messages[index].message.length });

        localMessages[index].revealed = !localMessages[index].revealed;
        localMessages[index][this.googleObj.source] = translation;
        return this.messages = localMessages;
      },
      (error) => {
        console.error({error});
        let localMessages = this.messages;
        localMessages[index].revealed = !localMessages[index].revealed;
        localMessages[index][this.googleObj.source] = error.message;
        return this.messages = localMessages;
      }
    );
  }

  onSubmit(e) {
    let value = this.googleObj.result?.trim();
    if (value) {
      let createdAt = Date.now();
      let key = `${this.user.uid}${createdAt}`;
      this.db.list(`messages/${this.googleObj.target}`).set(key, {
        createdAt: createdAt,
        key: key,
        message: value,
        user: {
          ...this.user
        }
      });
      this.googleObj.result = "";
    }
  }
}
