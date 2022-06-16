import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'medical'
})
export class MedicalPipe implements PipeTransform {
  transform(value: string, type: string): string {
    if (type === 'displayTypeBon') {
      if (value === 'PRISEENCHARGE'){
        return 'Prise en charge';
      } else if ( value === 'ENTENTEPREALABLE') {
        return 'Entente préalable';
       } else {
         return 'Prise en charge';
       }
    } else {
      return '';
    }
  }
}
