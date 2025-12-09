import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root',
})
export class BookRatingHelper {
  // AUFGABE: Rating muss Grenzen einhalten, z.B. 1...5
  rateUp(book: Book): Book {
    if (book.rating >= 5) {
      return book;
    }

    return {
      ...book,
      rating: book.rating + 1
    };
  }

  rateDown(book: Book): Book {
    return {
      ...book, // Spread-Operator
      rating: Math.max(book.rating - 1, 1)
    };
  }
}
