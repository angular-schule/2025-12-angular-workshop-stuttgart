import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { Field, form, maxLength, minLength, schema, min, max, required, pattern, provideSignalFormsConfig, validate, applyEach } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { BookStore } from '../shared/book-store';
import { Router } from '@angular/router';

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
  #bookStore = inject(BookStore);
  #router = inject(Router);


  protected readonly formData = signal<Book>({
    isbn: '',
    title: '',
    description: '',
    rating: 1,
    price: 0,
    authors: ['', ''],
    firstThumbnailUrl: ''
  });

  protected readonly bookForm = form(this.formData, schema(path => {
    required(path.isbn, { message: 'Die ISBN muss angegeben werden.' });
    required(path.title, { message: 'Der Titel muss angegeben werden.' });
    required(path.rating, { message: 'Das Rating muss angegeben werden.' });
    pattern(path.isbn, /^[0-9]+$/, { message: 'Die ISBN darf nur Zahlen beinhalten.' })

    minLength(path.isbn, 8, { message: 'Die ISBN muss min. 8 Zeichen lang sein.' });
    maxLength(path.isbn, 15, { message: 'Die ISBN darf max. 15 Zeichen lang sein' });
    min(path.rating, 1, { message: 'Rating min. 1' });
    max(path.rating, 5, { message: 'Rating max. 5' });
    min(path.price, 0, { message: 'Preis darf nicht negativ sein.' });

    validate(path.isbn, (ctx) => {
      if (!ctx.value().startsWith('978')) {
        return {
          kind: 'isbnprefix',
          message: 'ISBN muss mit 978 beginnen.'
        }
      } else {
        return undefined;
      }
    })

    applyEach(path.authors, (author) => {
      required(author);
    });
  }));


  addAuthorField() {
    this.bookForm.authors().value.update(currentAuthors => [...currentAuthors, '']);
  }

  submitForm() {
    // this.bookForm().value()
    this.#bookStore.create(this.formData()).subscribe(receivedBook => {
      this.#router.navigate(['/books', receivedBook.isbn]);
    });

    // verhindert Neuladen des Formulars
    return false;
  }
}


/* TODO
- Validerung
- Feedback
  - "Das Feld ist ungültig"
  - "Die ISBN ist zu kurz"
- (ISBN asynchron validieren)
- Button deaktivieren, wenn Formular ungültig ist
- Formular abschicken
  - HTTP-Request
  - bei Erfolg: wegnavigieren zur Detailseite

*/
