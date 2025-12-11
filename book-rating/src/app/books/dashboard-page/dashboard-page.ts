import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from '../book-card/book-card';
import { DatePipe } from '@angular/common';
import { BookRatingHelper } from '../shared/book-rating-helper';
import { BookStore } from '../shared/book-store';
import { map, Subscription, timer } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { LikedBooksDisplay } from '../liked-books-display/liked-books-display';

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard, DatePipe, LikedBooksDisplay],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  readonly #ratingHelper = inject(BookRatingHelper);
  readonly #bookStore = inject(BookStore);

  protected readonly likedBooks = signal<Book[]>([]);
  protected readonly books = this.#bookStore.getAllResource();
  protected readonly currentTimeStamp = toSignal(
    timer(0, 1000).pipe(
      map(() => Date.now())
    ),
    { initialValue: Date.now() }
  );

  // #sub: Subscription;

  constructor() {
    /*this.#bookStore.getAll().subscribe(receivedBooks => {
      this.books.set(receivedBooks);
    });*/

    /*setInterval(() => {
      this.currentTimeStamp.set(Date.now());
    }, 1000);
    */


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

  addToFavorites(likedBook: Book) {
    this.likedBooks.update(currentList => {
      return [...currentList, likedBook];
    });
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
