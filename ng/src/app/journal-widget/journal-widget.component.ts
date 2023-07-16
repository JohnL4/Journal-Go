import { Component, Input } from '@angular/core';
import { TrackableItem } from '../model/trackable-item';

@Component({
  selector: 'app-journal-widget',
  templateUrl: './journal-widget.component.html',
  styleUrls: ['./journal-widget.component.scss']
})
export class JournalWidgetComponent {
  @Input()
  public item: TrackableItem | undefined;

  public constructor() {};
}
