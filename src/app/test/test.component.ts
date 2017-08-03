import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-test',
    template: require('./test.component.html'),
    styles  : [require('./test.component.scss')],
})
export class TestComponent implements OnInit {
    @Input() myTitle: string;


    value: string = '';

    setValue() { this.value = 'Nancy'; }

    ngOnInit() {

    }
}
