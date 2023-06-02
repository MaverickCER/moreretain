import {
  Component,
  ViewChildren,
  OnInit,
  Input,
  QueryList,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { SpeechSynthesisService } from '@kamiazya/ngx-speech-synthesis';
import { TriggerComponent } from './tabs/trigger.component';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { AngularFireDatabase } from '@angular/fire/database';
import { SharedService } from "src/app/shared.service";
import { User } from '../models/user.model';
import { GoogleObj } from '../models/googleobj.model';

@Component({
  selector: 'polyglot',
  templateUrl: './polyglot.component.html',
  styleUrls: ['./polyglot.component.less'],
})
export class PolyglotComponent implements OnInit, AfterViewInit {
  public payPalConfig?: IPayPalConfig;
  googleObj: GoogleObj;
  user: User;
  voices: SpeechSynthesisVoice[] = [];

  constructor(public svc: SpeechSynthesisService, public db: AngularFireDatabase, private sharedService: SharedService) {
    this.sharedService.userDataSubject.subscribe((user: User) => this.user = user);
    this.sharedService.googleObjSubject.subscribe((googleObj: GoogleObj) => this.googleObj = googleObj);
  }

  ngOnInit(): void {
    this.initPaypalConfig();
    this.svc.getVoices();
    this.svc.onvoiceschanged = () => {
      let localVoices = this.svc.getVoices();
      this.voices = localVoices;
      this.sharedService.voicesSubject.next(this.voices);
      let source = localVoices.findIndex((voice) => {
        let language = voice.lang.split('-')[0];
        if (this.googleObj.source === language) {
          return true;
        }
        return false;
      });
      let target = localVoices.findIndex((voice) => {
        let language = voice.lang.split('-')[0];
        if (this.googleObj.target === language) {
          return true;
        }
        return false;
      });
      this.googleObj.voice0 = localVoices[source || 0] || null;
      this.googleObj.voice1 = localVoices[target || 0] || null;
      this.sharedService.googleObjSubject.next(this.googleObj);
    };
  }

  @ViewChildren(TriggerComponent, { read: ElementRef })
  tabElements: QueryList<ElementRef>;
  tabs: ElementRef[];
  activated = 0;
  focused = 0;
  error = '';

  ngAfterViewInit() {
    this.tabs = this.tabElements.toArray();
    this.tabElements.first.nativeElement.firstChild.tabIndex = '0';
  }

  activatePanel(index: number) {
    this.tabs.forEach((tab) => (tab.nativeElement.firstChild.tabIndex = -1));
    this.tabs[index].nativeElement.firstChild.tabIndex = index.toString();
    this.focused = index;
    this.activated = index;
  }

  focusPanel(index: number) {
    this.focused = index;
    this.tabs[this.focused].nativeElement.firstChild.focus();
  }

  handleKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.focusPanel(this.focused ? this.focused - 1 : this.tabs.length - 1);
        break;
      case 'ArrowRight':
        this.focusPanel((this.focused + 1) % this.tabs.length);
        break;
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Home':
        event.preventDefault();
        this.focusPanel(0);
        break;
      case 'End':
        event.preventDefault();
        this.focusPanel(this.tabElements.length - 1);
        break;
    }
  }

  private initPaypalConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'ASqHl3g6tveMC8S1X_cTYNitt9Pi_N2KeUEhb1pDxqgQ-jHDYuUIUPYYWHj_DQpkaOLnh-cMcyOux4xU',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: '0.99',
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: '0.99'
                  }
                }
              },
              items: [
                {
                  name: 'MoreRetain Translation Characters - 2500',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: '0.99',
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onClientAuthorization: (data) => {
        this.db.list(`users`).update(this.user.uid, { characters: this.user.characters + 2500 });
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
        this.error = err.message;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        this.error = '';
      },
    };
  }
}
