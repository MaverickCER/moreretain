import { SpeechSynthesisModule } from "@kamiazya/ngx-speech-synthesis";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { SvgModule } from "./svgs/svg.module";

import { PolyglotComponent } from "./polyglot.component";
import { CopyComponent } from "./copy/copy.component";
import { NullaryComponent } from "./nullary/nullary.component";
import { PrimaryComponent } from "./primary/primary.component";
import { PrimarylangComponent } from "./primarylang/primarylang.component";
import { RecogComponent } from "./recog/recog.component";
import { SecondaryComponent } from "./secondary/secondary.component";
import { SecondarylangComponent } from "./secondarylang/secondarylang.component";
import { SwapComponent } from "./swap/swap.component";
import { SynthComponent } from "./synth/synth.component";
import { TransComponent } from "./trans/trans.component";

@NgModule({
  declarations: [
    PolyglotComponent,
    CopyComponent,
    NullaryComponent,
    PrimaryComponent,
    PrimarylangComponent,
    RecogComponent,
    SecondaryComponent,
    SecondarylangComponent,
    SwapComponent,
    SynthComponent,
    TransComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    SvgModule,
    SpeechSynthesisModule.forRoot({
      lang: "en",
      volume: 1.0,
      pitch: 1.0,
      rate: 1.0
    })
  ],
  exports: [
    PolyglotComponent,
    CopyComponent,
    NullaryComponent,
    PrimaryComponent,
    RecogComponent,
    SecondaryComponent,
    SynthComponent,
    TransComponent
  ]
})
export class PolyglotModule {}
