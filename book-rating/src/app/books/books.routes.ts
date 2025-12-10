import { Routes } from "@angular/router";
import { DashboardPage } from "./dashboard-page/dashboard-page";
import { BookDetailsPage } from "./book-details-page/book-details-page";
import { BookCreatePage } from "./book-create-page/book-create-page";

export const booksRoutes: Routes = [
  { path: 'books', component: DashboardPage, title: 'Dashboard' },
  { path: 'books/create', component: BookCreatePage, title: 'Buch erstellen' },
  { path: 'books/:isbn', component: BookDetailsPage, title: 'Details' },
];
