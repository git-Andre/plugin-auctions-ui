import { Component, Input, OnInit } from '@angular/core';
import { Auction } from '../auction/auction'
import { AuctionService } from '../services/auction.service';
import {
    TerraButtonInterface,
    TerraSelectBoxValueInterface,
    TerraSimpleTableCellInterface,
    TerraSimpleTableHeaderCellInterface,
    TerraSimpleTableRowInterface,
} from '@plentymarkets/terra-components';
import { AUCTION_TABLE_HEADER_PROPS } from './headerProps';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';

@Component( {
    selector: 'app-add-auction',
    template: require( './add-auction.component.html' ),
    styles  : [ require( './add-auction.component.scss' ) ],
} )
export class AddAuctionComponent implements OnInit {

    @Input() myTitle: string;

    constructor( private auctionService: AuctionService, private http: Http ) {
    }

    auctionDuration = [ 3, 5, 7, 10, 20, 30 ]; // ToDo: later from configPlugin

    private _durationValues: Array<TerraSelectBoxValueInterface> = [];
    private _hourValues: Array<TerraSelectBoxValueInterface> = [];
    private _minuteValues: Array<TerraSelectBoxValueInterface> = [];

    private _headerList: Array<TerraSimpleTableHeaderCellInterface> = [];
    private _rowList: Array<TerraSimpleTableRowInterface> = [];

    private auction: Auction;
    private testAuction: Auction;
    private auctions: Auction[] = [];

    private url = 'https://schaffrathnumis.de/api/';

    private helper(): void {
        // this.deleteAuction( this.auction ); // Auktion muss von Tabelle 'delete-Button' kommen
        // this.getAuction( 10 );
        this.getAuctions();
    }

    private addAuctionClick(): void {

        this.createAuction( this.auction );
        this.initAuction(); // ToDo: wenn erfogreich...

    }

    getAuction( id: number ): Promise<void> {

        let url: string;
        url = this.url + 'auction/' + id;

        return this.http.get( url )
                   .toPromise()
                   .then( response => {
                       this.testAuction = JSON.parse( response.text() ) as Auction;
                   } )
                   .catch( this.handleError );
    }

    // saveAuction(): void {
    //     // ToDo: das hier für zukünftiges Editieren von Auktionen
    //     // this.auctionService.update( this.auction );
    // }

    createAuction( auktion: Auction ): void {

        this.auctionService.createAuction( auktion )

            .then( auction => {
                this.auctions.push( auction ); //  ToDo: ???? überlegen ????, wann intern oder extern auf die 'Auctions' zugegriffen wird...
            } );

    }

    deleteAuction( auction: Auction ): void {
        console.log( 'auction.id: ' + auction.id );
        this.auctionService
            .deleteAuction( auction.id )
            .then( () => {
                this.auctions = this.auctions.filter( a => a !== auction );
            } );
    }

    //
    getAuctions(): void {

        let url: string;
        url = this.url + 'auctions/';

        this.http.get( url )
            .map( res => res.json() )
            .subscribe( auctions => this.auctions = auctions );
    }

    initAuction(): void {
        this.auction = new Auction(
            null, null, 271, '08.31.2017', 19, 1, this.auctionDuration[ 3 ], 1.99, 0 );
    }

    ngOnInit(): void {
        this.getAuctions();
        this.initAuction();
        for ( let i = 0; i < 24; i++ ) {
            let selectValue: TerraSelectBoxValueInterface = {
                value  : i,
                caption: ((i < 10) ? '0' : '') + i + ' Uhr',
            }
            this._hourValues.push( selectValue );
        }
        for ( let i = 0; i < 60; i++ ) {
            let selectValue: TerraSelectBoxValueInterface = {
                value  : i,
                caption: ((i < 10) ? '0' : '') + i,
            }
            this._minuteValues.push( selectValue );
        }

        for ( let i = 0; i < this.auctionDuration.length; i++ ) {
            let selectValue: TerraSelectBoxValueInterface;
            selectValue = {
                value  : this.auctionDuration[ i ],
                caption: this.auctionDuration[ i ] + ' Tage',
            };
            this._durationValues.push( selectValue );
        }

// HeaderList
        for ( let header of AUCTION_TABLE_HEADER_PROPS ) {
            let cell: TerraSimpleTableHeaderCellInterface = {
                caption         : header[ "caption" ],
                width           : header[ "width" ],
                tooltipText     : header[ "tooltipText" ],
                tooltipPlacement: 'top',
            };
            this._headerList.push( cell );
        }

// RowList
        for ( let auction of this.auctions ) {

            let cellList: Array<TerraSimpleTableCellInterface> = [];

            let cell: TerraSimpleTableCellInterface;
            cell = { caption: auction.itemId, };
            cellList.push( cell );
            cell = { caption: 'text von item holen...', };
            cellList.push( cell );

            cell = { caption: auction.startDate, };
            cellList.push( cell );
            cell = { caption: auction.startHour + ":" + auction.startMinute, };
            cellList.push( cell );
            cell = { caption: auction.auctionDuration, };
            cellList.push( cell );
            cell = { caption: auction.startPrice, };
            cellList.push( cell );
            cell = { caption: auction.buyNowPrice, };
            cellList.push( cell );

            let buttonList: Array<TerraButtonInterface> = [];
            buttonList.push( {
                icon         : 'icon-edit',
                clickFunction: () => {
                    alert( "ToDo - Edit Auktion - ID:" + auction.id )
                },
            } );
            buttonList.push( {
                icon         : 'icon-delete',
                clickFunction: () => {
                    alert( "Button Delete with ID: " + auction.id + " clicked" )
                },
            } );
            let buttonCell: TerraSimpleTableCellInterface = {
                buttonList: buttonList,
            };

            cellList.push( buttonCell );

            let row: TerraSimpleTableRowInterface = {
                cellList: cellList,
            };
            this.rowList.push( row );
        }
    }

    public get headerList(): Array<TerraSimpleTableHeaderCellInterface> {
        return this._headerList;
    }

    public get rowList(): Array<TerraSimpleTableRowInterface> {
        return this._rowList;
    }

    private handleError( error: any ): Promise<any> {
        console.error( 'Fehler!! :', error ); // for demo purposes only
        return Promise.reject( error.message || error );
    }

// ToDo : remove this when we're done
    get diagnostic() {
        return JSON.stringify( this.auctions )
    }

    private logProps() {
        console.log( '##############' );
        console.log( JSON.stringify( this.auctions ) );
        console.log( '##############' );

    }
}
