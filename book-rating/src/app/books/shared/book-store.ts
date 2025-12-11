import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Book } from './book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookStore {
  #http = inject(HttpClient);
  #apiBaseUrl = 'https://api.angular.schule';

  readonly likedBooks = signal<Book[]>([]);

  addToFavorites(likedBook: Book) {
    this.likedBooks.update(currentList => {
      return [...currentList, likedBook];
    });
  }

  getAllResource(): HttpResourceRef<Book[]> {
    return httpResource<Book[]>(
      () => this.#apiBaseUrl + '/books',
      { defaultValue: [] }
    );
  }

  getAll(): Observable<Book[]> {
    return this.#http.get<Book[]>(this.#apiBaseUrl + '/books');
  }

  getSingle(isbn: string): Observable<Book> {
    return this.#http.get<Book>(this.#apiBaseUrl + '/books/' + isbn);
  }

  create(book: Book): Observable<Book> {
    return this.#http.post<Book>(this.#apiBaseUrl + '/books', book);
  }

  search(term: string): Observable<Book[]> {
    return this.#http.get<Book[]>(this.#apiBaseUrl + '/books/search/' + term);
  }
}
