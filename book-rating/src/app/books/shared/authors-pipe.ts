import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authors',
})
export class AuthorsPipe implements PipeTransform {

  transform(authors: string[]): string {
    return authors.join(', ');
  }

}
