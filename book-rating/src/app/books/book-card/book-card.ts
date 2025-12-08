import { Component, input } from '@angular/core';
import { Book } from '../shared/book';
import { RatingDisplay } from '../rating-display/rating-display';
import { CurrencyPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-book-card',
  imports: [RatingDisplay, CurrencyPipe, JsonPipe],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard {
  // Input: hier fließen Daten von der Elternkomponente hinein
  // von oben nach unten
  // readonly book = input<number>();
  // readonly bookx = input<number>(5);
  readonly book = input.required<Book>();
}
