import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { Auction } from '../auction/auction';
import { AuctionService } from '../services/auction.service';

import {
    TerraButtonInterface,
    TerraSimpleTableCellInterface,
    TerraSimpleTableComponent,
    TerraSimpleTableHeaderCellInterface,
    TerraSimpleTableRowInterface,
} from '@plentymarkets/terra-components';

import { AUCTION_TABLE_HEADER_PROPS } from '../add-auction/headerProps';

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
        // return JSON.stringify(this.auctions)
        // RowList
        for (let auction of this.auctions) {

            let cellList: Array<TerraSimpleTableCellInterface> = [];

            let cell: TerraSimpleTableCellInterface;
            cell = {caption: auction.itemId,};
            cellList.push(cell);
            cell = {caption: 'text von item holen...',};
            cellList.push(cell);

            cell = {caption: auction.startDate,};
            cellList.push(cell);
            cell = {caption: auction.startHour + ":" + auction.startMinute,};
            cellList.push(cell);
            cell = {caption: auction.auctionDuration,};
            cellList.push(cell);
            cell = {caption: auction.startPrice,};
            cellList.push(cell);
            cell = {caption: auction.buyNowPrice,};
            cellList.push(cell);

            let buttonList: Array<TerraButtonInterface> = [];
            buttonList.push({
                icon         : 'icon-edit',
                clickFunction: () => {
                    alert("ToDo - Edit Auktion - ID:" + auction.id)
                },
            });
            buttonList.push({
                icon         : 'icon-delete',
                clickFunction: () => {
                    alert("Button Delete with ID: " + auction.id + " clicked")
                },
            });
            let buttonCell: TerraSimpleTableCellInterface = {
                buttonList: buttonList,
            };

            cellList.push(buttonCell);

            let row: TerraSimpleTableRowInterface = {
                cellList: cellList,
            };

            this.rowList.push(row);
        }
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
