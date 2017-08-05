import { Component, Input, OnInit, DoCheck } from '@angular/core';

@Component( {
    selector: 'app-test',
    template: require( './test.component.html' ),
    styles  : [ require( './test.component.scss' ) ],

} )
export class TestComponent implements OnInit, DoCheck {
    @Input() myTitle: string;

// value: string = '';
//
// setValue() { this.value = 'Nancy'; }

// userData.component.ts
    newDate = new Date();

    date = this.newDate.toISOString();
    dateTest = new Date();

ngDoCheck() {

let str = this.transform(
    this.dateTest = new Date( this.date), true
);

    console.log( '##############' );
    console.log('dateTest: ' + this.dateTest);
    console.log('str: ' + str);

}
ngOnInit() {

}
    transform(value: Date, includeDate: boolean = false): string {
        let dd = value.getDate();
        let MM = value.getMonth() + 1;
        let yyyy = value.getFullYear();
        let hh = value.getHours();
        let mm = value.getMinutes();

        if (includeDate) return `${dd}.${MM}.${yyyy} ${hh}:${mm} Uhr`;
        return `${hh}:${mm} Uhr`;
    }

// let
// user = {
//     name      : 'Aaron Czichon',
//     last_login: new Date( '2016-07-07T18:25:43.511Z' ),

// }
}