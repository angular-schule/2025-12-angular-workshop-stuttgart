import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
})
export class Counter {
  protected readonly counter = signal(0);
  protected readonly counter100 = computed(() => this.counter() * 100);

  // AUFGABE: Reset-Button bauen, der den Counter auf 0 zurücksetzt

  constructor() {
    // Effect: wird immer neu ausgeführt, wenn
    // eins der verwendeten Signals seinen Wert ändert
    effect(() => {
      console.log('COUNTER:', this.counter());
    });
  }

  increment() {
    this.counter.update(value => value + 1);
  }
  decrement() {
    this.counter.update(value => value - 1);
  }
  reset() {
    this.counter.set(0);
  }
}
