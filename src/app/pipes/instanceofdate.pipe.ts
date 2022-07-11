import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instanceofdate',
})
export class InstanceofdatePipe implements PipeTransform {
  transform(value: any): boolean {
    if (typeof value !== 'object') return false;
    const date = new Date(value.year, value.month - 1, value.day);

    return date instanceof Date && date.toString() !== 'Invalid Date';
  }
}
