import { NgModule } from "@angular/core";

import { CopySVGComponent } from "./copy.component";
import { KeySVGComponent } from "./key.component";
import { MicSVGComponent } from "./mic.component";
import { MuteSVGComponent } from "./mute.component";
import { PaySVGComponent } from "./pay.component";
import { PlaySVGComponent } from "./play.component";
import { RepeatSVGComponent } from "./repeat.component";
import { StopSVGComponent } from "./stop.component";
import { TranslateSVGComponent } from "./translate.component";
import { TrashSVGComponent } from "./trash.component";
import { UserSVGComponent } from "./user.component";

@NgModule({
  declarations: [
    CopySVGComponent,
    KeySVGComponent,
    MicSVGComponent,
    MuteSVGComponent,
    PaySVGComponent,
    PlaySVGComponent,
    RepeatSVGComponent,
    StopSVGComponent,
    TranslateSVGComponent,
    TrashSVGComponent,
    UserSVGComponent
  ],
  exports: [
    CopySVGComponent,
    KeySVGComponent,
    MicSVGComponent,
    MuteSVGComponent,
    PaySVGComponent,
    PlaySVGComponent,
    RepeatSVGComponent,
    StopSVGComponent,
    TranslateSVGComponent,
    TrashSVGComponent,
    UserSVGComponent
  ]
})
export class SvgModule {}
