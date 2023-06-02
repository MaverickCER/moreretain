import { SpeechSynthesisModule } from "@kamiazya/ngx-speech-synthesis";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { NgxPayPalModule } from 'ngx-paypal';
import { SvgModule } from "./svgs/svg.module";

import { PolyglotComponent } from "./polyglot.component";
import { CardsComponent } from './cards/cards.component';
import { ChatComponent } from './chat/chat.component';
import { CircuitComponent } from './circuit/circuit.component';
import { CopyComponent } from "./copy/copy.component";
import { PrimaryComponent } from "./primary/primary.component";
import { PrimarylangComponent } from "./primarylang/primarylang.component";
import { RecogComponent } from "./recog/recog.component";
import { SecondaryComponent } from "./secondary/secondary.component";
import { SecondarylangComponent } from "./secondarylang/secondarylang.component";
import { SwapComponent } from "./swap/swap.component";
import { SynthComponent } from "./synth/synth.component";
import { TransComponent } from "./trans/trans.component";
import { PanelComponent } from "./tabs/panel.component";
import { TriggerComponent } from "./tabs/trigger.component";

@NgModule({
  declarations: [
    PolyglotComponent,
    CardsComponent,
    ChatComponent,
    CircuitComponent,
    CopyComponent,
    PanelComponent,
    PrimaryComponent,
    PrimarylangComponent,
    RecogComponent,
    SecondaryComponent,
    SecondarylangComponent,
    SwapComponent,
    SynthComponent,
    TransComponent,
    TriggerComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SvgModule,
    NgxPayPalModule,
    SpeechSynthesisModule.forRoot({
      lang: "en",
      volume: 1.0,
      pitch: 1.0,
      rate: 1.0
    })
  ],
  exports: [
    PolyglotComponent,
    CardsComponent,
    ChatComponent,
    CircuitComponent,
    CopyComponent,
    PanelComponent,
    PrimaryComponent,
    RecogComponent,
    SecondaryComponent,
    SynthComponent,
    TransComponent,
    TriggerComponent
  ]
})
export class PolyglotModule {}
