import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));


//////////////////////////////////


class Customer {
  // Property
  // id: number = 5;
  #id: number;

  constructor(idx: number) {
    this.#id = idx;
  }

  // Methode
  foobar(foo: number): string {
    console.log(this.#id);

    setTimeout(() => {
      console.log(this.#id);
    }, 2000)
    return '';
  }
}

const myCustomer = new Customer(5);
// myCustomer.#id





const foo = function (param) {
  return param + 1;
}

const foo2 = param => param + 1;


const result = foo(5);



fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });

  console.log('A');

  setTimeout(() => {
    console.log('Hallo!');
  }, 2000);


  console.log('C');
