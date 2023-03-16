import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringmaxlength',
})
export class StringmaxlengthPipe implements PipeTransform {
  transform(value: string, maxLength: number): string {
    if (value.length > maxLength) {
      value = value.substring(0, maxLength) + '..';
    }
    return value;
  }
}
