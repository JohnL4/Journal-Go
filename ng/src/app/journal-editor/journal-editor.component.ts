import { Component } from '@angular/core';
import { TrackableItem } from '../model/trackable-item';
import { TrackableItemTypeEnum } from '../model/trackable-item-type-enum';

const WORD_CHARS = "abcdefghijklmnopqrstuvwxyz".split("");

@Component({
  selector: 'app-journal-editor',
  templateUrl: './journal-editor.component.html',
  styleUrls: ['./journal-editor.component.scss']
})
export class JournalEditorComponent {

  private _items: Array<TrackableItem> = new Array<TrackableItem>();

  ngOnInit() {
    for (let i = 0; i < 20; i++) {
      var item: TrackableItem;
      let label = this.randomLabel();
      let r = Math.floor(Math.random() * 3);
      switch (r) {
        case 0: item = new TrackableItem(i.toString(), TrackableItemTypeEnum.Boolean, false, label); break;
        case 1: item = new TrackableItem(i.toString(), TrackableItemTypeEnum.Enumeration, label, label); break;
        case 2: item = new TrackableItem(i.toString(), TrackableItemTypeEnum.ShortText, label, label); break;
        default: throw `Unexpected item type: ${r}`;
      }
      this._items.push( item);
    }
  }

  public get items() { return this._items; }

  /**
   * @returns A short random phrase of random "words"
   */
  randomLabel(): string {
    let words = new Array<string>();
    let wordCount = Math.floor( 1 + Math.random() * 5);
    for (let i = 0; i < wordCount; i++) {
      let wordChars = new Array<string>();
      let wordLength = Math.floor( 1 + Math.random() * 8);   // Should give range [1..9], so avg word length of 5 chars.
      for (let j = 0; j < wordLength; j++) {
        let r = Math.floor( Math.random() * WORD_CHARS.length);
        wordChars.push( WORD_CHARS[ r] );
      }
      let word = wordChars.join( "");
      words.push( word);
    }
    return words.join( " ");
  }
}
