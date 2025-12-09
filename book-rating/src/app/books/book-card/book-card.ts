import { Component, computed, input, output } from '@angular/core';
import { Book } from '../shared/book';
import { RatingDisplay } from '../rating-display/rating-display';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { AuthorsPipe } from "../shared/authors-pipe";

@Component({
  selector: 'app-book-card',
  imports: [RatingDisplay, CurrencyPipe, JsonPipe, AuthorsPipe],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard {
  // Input: hier fließen Daten von der Elternkomponente hinein
  // von oben nach unten
  // readonly book = input<number>();
  // readonly bookx = input<number>(5);
  readonly book = input.required<Book>();

  // Output: hier fließen Daten zur Elternkomponente hinaus
  // von unten nach oben
  readonly rateUp = output<Book>();
  readonly rateDown = output<Book>();

  protected readonly authorsList = computed(() => this.book().authors.join(', '));

  doRateUp() {
    this.rateUp.emit(this.book());
  }

  doRateDown() {
    this.rateDown.emit(this.book());
  }
}
