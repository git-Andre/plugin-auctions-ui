import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'timeFormat'})
export class TimeFormatPipe implements PipeTransform {
    transform(value: Date, includeDate: boolean = false): string {
        let dd = value.getDate();
        let MM = value.getMonth() + 1;
        let yyyy = value.getFullYear();
        let hh = value.getHours();
        let mm = value.getMinutes();

        if (includeDate) return `${dd}.${MM}.${yyyy} ${hh}:${mm} Uhr`;
        return `${hh}:${mm} Uhr`;
    }
}