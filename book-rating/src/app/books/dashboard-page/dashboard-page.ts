import { Component, signal } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  protected readonly books = signal<Book[]>([]);

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
    ])
  }
}


/*
TODO
- Struktur der Daten (Datenmodell)
- Daten (Book[])
- Schleife
- Box zur Anzeige eines Buchs => eigene Komponente
*/
