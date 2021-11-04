import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precio'
})
export class PrecioPipe implements PipeTransform {

  transform(value: Number, query:string): unknown {
    if(query === '' || query === undefined) {
      return value;
    }
    var value2 = parseFloat( query.replace('$',''));
    return value2;
  }

}
