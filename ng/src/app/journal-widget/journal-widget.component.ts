import { Component, Input } from '@angular/core';
import { TrackableItem } from '../model/trackable-item';
import { TrackableItemTypeEnum } from '../model/trackable-item-type-enum';

@Component({
  selector: 'app-journal-widget',
  templateUrl: './journal-widget.component.html',
  styleUrls: ['./journal-widget.component.scss']
})
export class JournalWidgetComponent {
  @Input()
  public item: TrackableItem | undefined;

  public constructor() {};

  get isCheckbox(): boolean { return this.item?.itemType == TrackableItemTypeEnum.Boolean }
  
  get isShortText(): boolean { return this.item?.itemType == TrackableItemTypeEnum.ShortText }

  get isDropdown(): boolean { return this.item?.itemType == TrackableItemTypeEnum.Enumeration }

  get isUnknownType(): boolean { return ! (this.isCheckbox || this.isShortText || this.isDropdown) }
  
}
