import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from '../book-card/book-card';
import { DatePipe } from '@angular/common';
import { BookRatingHelper } from '../shared/book-rating-helper';
import { BookStore } from '../shared/book-store';
import { map, Subscription, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  // #sub: Subscription;

  constructor() {
    /*this.#bookStore.getAll().subscribe(receivedBooks => {
      this.books.set(receivedBooks);
    });*/

    /*setInterval(() => {
      this.currentTimeStamp.set(Date.now());
    }, 1000);
    */

    timer(0, 1000).pipe(
      map(() => Date.now()),
      takeUntilDestroyed()
    ).subscribe(e => {
      this.currentTimeStamp.set(e);
      console.log(e);
    });
  }

  // Lifecycle Hook
  /*ngOnDestroy() {
    console.log('DESTROY');
    this.#sub.unsubscribe();
  }*/

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
