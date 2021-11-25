import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'upercase'})
export class Upercase implements PipeTransform{
	transform(value: string): string {
		return value.toUpperCase();
	}
}