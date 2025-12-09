import { Component, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from '../book-card/book-card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard, DatePipe],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  protected readonly books = signal<Book[]>([]);
  protected readonly currentTimeStamp = signal(Date.now());

  constructor() {
    this.books.set([
      {
        isbn: '123',
        title: 'Angular',
        description: 'Grundlagen und mehr',
        rating: 5,
        price: 42.9,
        authors: ['FM', 'DK', 'JH']
      },
      {
        isbn: '456',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        rating: 3,
        price: 36.9,
        authors: ['EY']
      },
    ]);

    setInterval(() => {
      this.currentTimeStamp.set(Date.now());
    }, 1000);
  }

  doRateUp(book: Book) {
    const ratedBook = {
      ...book,
      rating: book.rating + 1
    };
    this.#updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = {
      ...book, // Spread-Operator
      rating: book.rating - 1
    };
    this.#updateList(ratedBook);
  }

  #updateList(ratedBook: Book) {
    this.books.update(currentList => {
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
