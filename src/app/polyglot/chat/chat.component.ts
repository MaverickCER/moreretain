import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { GoogleService } from "../services/google/google.services";

@Component({
  selector: "chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.less"],
  providers: [GoogleService]
})
export class ChatComponent {
  @Input() googleObj: any = {};
  @Input() user: any = {};
  @Input() voices: object[];
  @Output() googleObjChange = new EventEmitter<object>();
  messages = [];

  constructor(public db: AngularFireDatabase, private _google: GoogleService) {}

  get result() {
    return this.googleObj.result;
  }

  set result(value) {
    this.googleObj.result = new String(value);
    this.googleObjChange.emit(this.googleObj);
  }

  ngOnInit(): void {
    this.db.list(`messages/${this.googleObj.target}`, ref => ref.orderByChild('createdAt')).valueChanges().subscribe(((messagesData: any) => {
      this.messages = messagesData;
    }));
  }

  updateHistory(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') return;
    this.db.list(`history/${this.user.uid}/${this.googleObj.source}`).update(this.googleObj.target, { [key.toLowerCase()]: value.toLowerCase() });
    this.db.list(`history/${this.user.uid}/${this.googleObj.target}`).update(this.googleObj.source, { [value.toLowerCase()]: key.toLowerCase() });
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
      this.googleObjChange.emit(this.googleObj);
    }
  }
}
