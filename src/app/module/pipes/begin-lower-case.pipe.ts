import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'beginLowerCase'
})
export class BeginLowerCasePipe implements PipeTransform {
    transform(value: string): string {
        if (value !== null) {
            if (this.decoupe(value).length === 1) {
                return this.beginLower(value);
            } else {
                return this.beginLowerList(this.decoupe(value));
            }
        }
    }

    decoupe(entree: string): string[] {
        return entree.split(' ');
    }

    beginLower(value: string): string {
        return value[0]
            .toUpperCase()
            .concat(value.substring(1).toLowerCase())
            .concat(' ');
    }

    beginLowerList(values: string[]): string {
        let sortie = '';
        values.forEach(val => {
            sortie += this.beginLower(val);
        });
        return sortie;
    }
}
