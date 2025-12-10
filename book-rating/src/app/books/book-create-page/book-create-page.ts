import { Component, signal } from '@angular/core';
import { Book } from '../shared/book';
import { Field, form, maxLength, minLength, schema, min, max, required, pattern, provideSignalFormsConfig } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-book-create-page',
  imports: [Field, JsonPipe],
  templateUrl: './book-create-page.html',
  styleUrl: './book-create-page.scss',
  providers: [
    provideSignalFormsConfig({
      classes: {
        'invalid': state => state.invalid() && state.touched()
      }
    })
  ]
})
export class BookCreatePage {
  protected readonly formData = signal<Book>({
    isbn: '',
    title: '',
    description: '',
    rating: 1,
    price: 0,
    authors: ['', '']
  });

  protected readonly bookForm = form(this.formData, schema(path => {
    required(path.isbn);
    required(path.title);
    required(path.rating);
    pattern(path.isbn, /^[0-9]+$/)

    minLength(path.isbn, 8);
    maxLength(path.isbn, 15);
    min(path.rating, 1);
    max(path.rating, 5);
    min(path.price, 0);
  }));
}


/* TODO
- Validerung
- Feedback
  - "Das Feld ist ungültig"
  - "Die ISBN ist zu kurz"
- (ISBN asynchron validieren)
- Button deaktivieren, wenn ungültig
- Formular abschicken
  - HTTP-Request
  - bei Erfolg: wegnavigieren zur Detailseite

*/
