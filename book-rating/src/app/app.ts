import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from "./counter/counter";
import { DashboardPage } from './books/dashboard-page/dashboard-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Counter, DashboardPage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('book-rating');
}
