import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
})
export class Counter {
  protected readonly counter = signal(0);

  increment() {
    this.counter.update(value => value + 1);
  }
  decrement() {
    this.counter.update(value => value - 1);
  }
}
