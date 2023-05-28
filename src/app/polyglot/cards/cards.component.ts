import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: "cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.less"]
})
export class CardsComponent {
  @Input() googleObj: any = {};
  @Input() user: any = {};
  @Input() voices: object[];
  @Output() googleObjChange = new EventEmitter<object>();
  cardBack = "";
  cardFront = "";
  cards: { [x: string]: string }[] = [];
  revealed = false;
  placeholder = "";
  timer = undefined;
  preventSimpleClick = true;

  constructor(public db: AngularFireDatabase) {}

  get result() {
    return this.googleObj.result;
  }

  set result(value) {
    this.googleObj.result = new String(value);
    this.googleObjChange.emit(this.googleObj);
  }

  ngOnInit() {
    this.db.object(`history/${this.user.uid}/${this.googleObj.source}/${this.googleObj.target}`).valueChanges().subscribe(((historyData: any) => {
      this.cards = Object.entries(historyData).map((entry) => {return { [entry[0].toLowerCase()]: entry[1].toString().toLowerCase() }});
      let index = Math.floor(Math.random()*this.cards.length);
      let key = Object.keys(this.cards[index])[0];
      let value = Object.values(this.cards[index])[0];
      this.cardBack = this.revealed ? value : key;
      this.cardFront = this.revealed ? key : value;
    }));
  }

  singleClick() {
    this.timer = undefined;
    this.preventSimpleClick = false;
    let delay = 500;

    this.timer = setTimeout(() => {
      if(!this.preventSimpleClick){
        this.revealed = !this.revealed;
      }
    }, delay);
  }

  doubleClick() {
    this.preventSimpleClick = true;
    clearTimeout(this.timer);
    let index = Math.floor(Math.random()*this.cards.length);
    let key = Object.keys(this.cards[index])[0];
    let value = Object.values(this.cards[index])[0];
    this.cardBack = this.revealed ? value : key;
    this.cardFront = this.revealed ? key : value;
  }

  remove(key) {
    this.db.list(`history/${this.user.uid}/${this.googleObj.target}`).remove(key);
  }

  onSubmit(e) {
    let value = this.googleObj.result?.trim()?.toLowerCase();
    if (!value) {
      this.placeholder = "";
      return this.doubleClick();
    }
    let translation = this.revealed ? this.cardFront : this.cardBack;
    if (value === translation) {
      this.placeholder = "Correct :)"
    } else {
      this.placeholder = "Incorrect :("
    }
    this.googleObj.result = "";
    this.googleObjChange.emit(this.googleObj);
    this.revealed = !this.revealed;
  }
}
