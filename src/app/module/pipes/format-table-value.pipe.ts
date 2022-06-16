import { Pipe, PipeTransform } from '@angular/core';
import { DateUtils } from '../util/date-util';
import { removeBlanks } from '../util/common-util';

@Pipe({
  name: 'formatTableValue'
})
export class FormatTableValuePipe implements PipeTransform {

  transform(value: any, type: string, formatInput?: boolean): string {
    if (value) {
      if (type === 'date') {
        return DateUtils.toFormatFromString(value, 'YYYY-MM-DD\'T\'HH:mm:ss Z');
      } else if (type === 'number') {
        if (formatInput && typeof value === 'string') {
          value = removeBlanks(value);
        }
        let retValue = Number(value).toLocaleString('fr-FR');
        if (retValue === 'NaN') {
          retValue = '';
        }
        return retValue;
      } else if (type ==='phoneContact') {
        return value.replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
      }
       else {
        return value;
      }
    } else {
      return value;
    }
  }

}
