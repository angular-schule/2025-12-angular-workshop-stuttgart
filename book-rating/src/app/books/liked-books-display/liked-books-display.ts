import { Component, input } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'app-liked-books-display',
  imports: [],
  templateUrl: './liked-books-display.html',
  styleUrl: './liked-books-display.scss',
})
export class LikedBooksDisplay {
  readonly likedBooks = input.required<Book[]>();
}
