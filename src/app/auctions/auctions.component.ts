import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { Auction } from '../helper/auction';
import { AuctionService } from '../services/auction.service';

import {
    TerraButtonInterface,
    TerraSimpleTableCellInterface,
    TerraSimpleTableComponent,
    TerraSimpleTableHeaderCellInterface,
    TerraSimpleTableRowInterface,
} from '@plentymarkets/terra-components';

import { AUCTION_TABLE_HEADER_PROPS } from '../helper/constants';

@Component({
    selector: 'app-auctions',
    template: require('./auctions.component.html'),
    styles  : [require('./auctions.component.scss')],
})

export class AuctionsComponent implements OnInit {

    @ViewChild('table') table: TerraSimpleTableComponent;

    private _viewContainerRef: ViewContainerRef;
    private _headerList: Array<TerraSimpleTableHeaderCellInterface> = [];
    private _rowList: Array<TerraSimpleTableRowInterface> = [];

    auctions: Auction[] = [];

    constructor(private auctionService: AuctionService, public viewContainerRef: ViewContainerRef) {
        this._viewContainerRef = viewContainerRef;
    }

    getAuctions(): void {
        // this.auctionService.getAuctions().then(auctions => this.auctions = auctions);
        // this.auctions = this.auctionService.getAuctions();
    }

    ngOnInit() {
        this.getAuctions();

        // HeaderList
        for (let header of AUCTION_TABLE_HEADER_PROPS) {
            let cell: TerraSimpleTableHeaderCellInterface = {
                caption         : header["caption"],
                width           : header["width"],
                tooltipText     : header["tooltipText"],
                tooltipPlacement: 'top',
            };
            this.headerList.push(cell);
        }


    }

    test() {
    }

    get diagnostic() {
        return JSON.stringify(this.auctions)
    }

    public get headerList(): Array<TerraSimpleTableHeaderCellInterface> {
        return this._headerList;
    }

    public get rowList(): Array<TerraSimpleTableRowInterface> {
        return this._rowList;
    }
}
