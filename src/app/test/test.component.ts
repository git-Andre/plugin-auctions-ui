import { Component, Input, OnInit } from '@angular/core';
import { LoginTimeFormatPipe } from '../add-auction/loginTimeFormat.pipe';

@Component( {
    selector: 'app-test',
    template: require( './test.component.html' ),
    styles  : [ require( './test.component.scss' ) ],

} )
export class TestComponent {
    @Input() myTitle: string;

    // value: string = '';
    //
    // setValue() { this.value = 'Nancy'; }

    // userData.component.ts

    let
    user = {
        name      : 'Aaron Czichon',
        last_login: new Date( '2016-07-07T18:25:43.511Z' )



    }
}
