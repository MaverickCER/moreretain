import { Component } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { GoogleObj } from "src/app/models/googleobj.model";
import { User } from "src/app/models/user.model";
import { SharedService } from "src/app/shared.service";

@Component({
  selector: "cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.less"]
})
export class CardsComponent {

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
  user: User;
  cardBack = "";
  cardFront = "";
  cards: { [x: string]: string }[] = [];
  revealed = false;
  placeholder = "";
  timer = undefined;
  preventSimpleClick = true;

  constructor(public db: AngularFireDatabase, private sharedService: SharedService) {
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
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    if (this.user && this.user.uid && this.googleObj && this.googleObj.source && this.googleObj.target) {
      this.db.object(`history/${this.user.uid}/${this.googleObj.source}/${this.googleObj.target}`).valueChanges().subscribe(((historyData: any) => {
        this.cards = Object.entries(historyData).map((entry) => { return { [entry[0].toLowerCase()]: entry[1].toString().toLowerCase() } });
        let index = Math.floor(Math.random() * this.cards.length);
        let key = Object.keys(this.cards[index])[0];
        let value = Object.values(this.cards[index])[0];
        this.cardBack = this.revealed ? value : key;
        this.cardFront = this.revealed ? key : value;
      }));
    }
  }

  remove(key) {
    this.db.list(`history/${this.user.uid}/${this.googleObj.target}`).remove(key);
  }

  onSubmit(e) {
    let value = this.googleObj.result?.trim()?.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    if (value) {
      if (value === this.cardFront || value === this.cardBack) {
        this.placeholder = "Correct :)"
      } else {
        this.placeholder = "Incorrect :("
      }
      this.googleObj.result = "";
      this.revealed = !this.revealed;
    } else {      
      this.placeholder = "";
      let index = Math.floor(Math.random() * this.cards.length);
      let key = Object.keys(this.cards[index])[0];
      let value = Object.values(this.cards[index])[0];
      this.cardBack = this.revealed ? value : key;
      this.cardFront = this.revealed ? key : value;
    }
  }
}

