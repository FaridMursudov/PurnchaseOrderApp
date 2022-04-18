import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: number): any {
    switch (value) {
      case 0:
        return 'DRAFT'

      case 1:
        return 'SUBMITTED'
    
      default:
        return 'UNDEFINED'
    }
  }

}
