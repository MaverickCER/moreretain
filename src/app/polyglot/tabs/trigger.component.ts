import { Component, Input } from '@angular/core';

@Component({
  selector: 'trigger',
  templateUrl: "./trigger.component.html",
  styleUrls: ['./trigger.component.less']
})
export class TriggerComponent {
  @Input() isActive: boolean;
  @Input() triggerId: string;
  @Input() panelId: string;
}