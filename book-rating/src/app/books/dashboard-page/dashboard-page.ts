import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from '../book-card/book-card';
import { DatePipe } from '@angular/common';
import { BookRatingHelper } from '../shared/book-rating-helper';
import { BookStore } from '../shared/book-store';

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard, DatePipe],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  readonly #ratingHelper = inject(BookRatingHelper);
  readonly #bookStore = inject(BookStore);

  protected readonly books = this.#bookStore.getAllResource();
  protected readonly currentTimeStamp = signal(Date.now());


  constructor() {
    /*this.#bookStore.getAll().subscribe(receivedBooks => {
      this.books.set(receivedBooks);
    });*/

    setInterval(() => {
      this.currentTimeStamp.set(Date.now());
    }, 1000);
  }

  doRateUp(book: Book) {
    const ratedBook = this.#ratingHelper.rateUp(book);
    this.#updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.#ratingHelper.rateDown(book);
    this.#updateList(ratedBook);
  }

  #updateList(ratedBook: Book) {
    this.books.value.update(currentList => {
      return currentList.map(b => {
        if (b.isbn === ratedBook.isbn) {
          return ratedBook;
        } else {
          return b;
        }
      })
    });
  }
}
