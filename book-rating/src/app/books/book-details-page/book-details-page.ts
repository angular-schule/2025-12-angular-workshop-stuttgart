import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../shared/book';
import { BookStore } from '../shared/book-store';

@Component({
  selector: 'app-book-details-page',
  imports: [RouterLink],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.scss',
})
export class BookDetailsPage {
  #route = inject(ActivatedRoute);
  #bookStore = inject(BookStore);
  protected readonly book = signal<Book | undefined>(undefined);

  constructor() {
    // PULL
    // const isbn = this.#route.snapshot.paramMap.get('isbn');

    // PUSH
    this.#route.paramMap.subscribe(params => {
      const isbn = params.get('isbn')!; // Non-Null Assertion – vorsichtig sein!
      this.#bookStore.getSingle(isbn).subscribe(b => {
        this.book.set(b);
      });
    });
  }
}
