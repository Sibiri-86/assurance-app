// TODO: figure out way to import momment global
import * as moment from 'moment';

export class DateUtils {

  public static toFormatFromDate(date: Date, pattern: string = 'DD/MM/YYYY'): string {
    return moment(date).format(pattern);
  }

  public static toFormatFromString(dateString: string, dateStringPattern: string, toPattern: string = 'DD/MM/YYYY'): string {
    const dateTmp = moment(dateString, dateStringPattern).toDate();
    return DateUtils.toFormatFromDate(dateTmp, toPattern);
  }

  public static patternToDate(dateString: string, pattern: string): Date {
    const date = moment(dateString, pattern).toDate();
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  }

  public static unixToDate(unixStamp: number): Date {
    return moment(Number(unixStamp)).toDate();
  }

  public static sortArray(objectList: Array<any>, field: string, typCrois: string): Array<any> {
    let array: Array<any>;
    switch (typCrois) {
      case 'asc': {
        array = objectList.sort((a, b) => ((a[field] < b[field]) ? -1 : 1));
        break;
      }
      case 'desc': {
        array = objectList.sort((a, b) => ((a[field] > b[field]) ? -1 : 1));
        break;
      }
    }
    return array;
  }
}
