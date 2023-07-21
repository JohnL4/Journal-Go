import { Injectable } from '@angular/core';

const WORD_CHARS = "abcdefghijklmnopqrstuvwxyz".split("");

/**
 * Provides random words and phrases.
 */
@Injectable({
  providedIn: 'root'
})
export class RandomWordService {

  constructor() { }

  /**
   * @param aNumberOfWords Maximum number of words in phrase.
   * @returns A random phrase of 1--aNumberOfWords random "words"
   */
  public randomPhrase( aNumberOfWords: number): string {
    let words = new Array<string>();
    let wordCount = Math.floor( 1 + Math.random() * 5);
    for (let i = 0; i < wordCount; i++) {
      let word = this.randomWord( 9); // Should give avg length of (1+9)/2 = 5 characters.
      words.push( word);
    }
    return words.join( " ");
  }

  /**
   * 
   * @param aWordLength Maximum number of characters in word
   * @returns A random word composed of between 1--aWordLength characters.
   */
  public randomWord( aNumberOfCharacters: number): string {
    let wordChars = new Array<string>();
    let wordLength = 1 + Math.floor( Math.random() * aNumberOfCharacters);
    for (let j = 0; j < wordLength; j++) {
      let r = Math.floor( Math.random() * WORD_CHARS.length);
      wordChars.push( WORD_CHARS[ r] );
    }
    let word = wordChars.join( "");
    return word;
  }
}
 