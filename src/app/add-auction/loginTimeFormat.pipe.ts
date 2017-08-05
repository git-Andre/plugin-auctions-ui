import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'loginTimeFormat'})
export class LoginTimeFormatPipe implements PipeTransform {
    transform(value: Date): string {
        let dd = value.getDate();
        let MM = value.getMonth() + 1;
        let yyyy = value.getFullYear();
        let hh = value.getHours();
        let mm = value.getMinutes();

        let formattedDayTime = `${dd}.${MM}.${yyyy} ${hh}:${mm} Uhr`;
        return formattedDayTime;
    }
}