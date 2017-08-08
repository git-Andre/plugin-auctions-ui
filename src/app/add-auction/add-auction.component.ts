import { Component, Input, OnInit } from '@angular/core';
import { Auction } from '../helper/auction'
import { ItemParam } from '../helper/itemParam'
import { AuctionService } from '../services/auction.service';
import { ItemService } from '../services/item.service';
import { TerraButtonInterface, TerraSelectBoxValueInterface, TerraSimpleTableCellInterface, TerraSimpleTableHeaderCellInterface, TerraSimpleTableRowInterface, } from '@plentymarkets/terra-components';

import { AUCTION_TABLE_HEADER_PROPS } from '../helper/headerProps';
import { DATE_OPTIONS } from '../helper/dateOptions';
import { URL_HELPER } from '../helper/url-helper';
// import { TimeFormatPipe } from './timeFormat.pipe';
// import { Pipe, PipeTransform } from '@angular/core';
// import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';

@Component( {
    selector: 'app-add-auction',
    template: require( './add-auction.component.html' ),
    styles  : [require( './add-auction.component.scss' )],
} )
export class AddAuctionComponent implements OnInit {

    @Input() myTitle: string;
    auctionDuration = [3, 5, 7, 10, 20, 30]; // ToDo: later from configPlugin
    //
    private _durationValues: Array<TerraSelectBoxValueInterface> = [];
    private _hourValues: Array<TerraSelectBoxValueInterface> = [];
    private _minuteValues: Array<TerraSelectBoxValueInterface> = [];
    private itemIdIsDisabled = false;
    private isAuctionInEditMode = false;
    private formName = 'Neue Auktion erstellen !';
    private buttonName = 'Neue Auktion speichern !';
    private auction: Auction = new Auction;
    private auctions: Auction[] = [];
    private itemParams: ItemParam[] = [];

    private url = URL_HELPER['url'] + '/api/'; // https://schaffrathnumis.de oder ""
    private startDate = new Date().toISOString();
    private locale = 'de-DE'; // ToDo: NACHDENKEN... ???!!?
    // private isItemIdValid = true;

    constructor( private auctionService: AuctionService, private http: Http, private itemService: ItemService ) {
    }

    private _headerList: Array<TerraSimpleTableHeaderCellInterface> = [];
    public get headerList(): Array<TerraSimpleTableHeaderCellInterface> {
        return this._headerList;
    }

    private _rowList: Array<TerraSimpleTableRowInterface> = [];
    public get rowList(): Array<TerraSimpleTableRowInterface> {
        return this._rowList;
    }

// ToDo : remove this when we're done
    get diagnostic() {
        return JSON.stringify( this.auctions )
    }

    ngOnInit(): void {
        this.auctions[0] = this.auction;
        this.getAuctions();
        this.initAuction();

        // Stunden Selectbox
        for ( let i = 0; i < 24; i++ ) {
            let selectValue: TerraSelectBoxValueInterface = {
                value  : i,
                caption: ((i < 10) ? '0' : '') + i + ' Uhr',
            }
            this._hourValues.push( selectValue );
        }

        // Minuten Selectbox
        for ( let i = 0; i < 60; i++ ) {
            let selectValue: TerraSelectBoxValueInterface = {
                value  : i,
                caption: ((i < 10) ? '0' : '') + i,
            }
            this._minuteValues.push( selectValue );
        }

        // Dauer Selectbox
        for ( let i = 0; i < this.auctionDuration.length; i++ ) {
            let selectValue: TerraSelectBoxValueInterface;
            selectValue = {
                value  : this.auctionDuration[i],
                caption: this.auctionDuration[i] + ' Tage',
            };
            this._durationValues.push( selectValue );
        }

        // HeaderList
        for ( let header of AUCTION_TABLE_HEADER_PROPS ) {
            let cell: TerraSimpleTableHeaderCellInterface = {
                caption         : header["caption"],
                width           : header["width"],
                tooltipText     : header["tooltipText"],
                tooltipPlacement: 'top',
            };
            this._headerList.push( cell );
        }
    }

    // ngAfterContentChecked() {
    //     // this.updateTable()
    // }

    logProps() {
        console.log( '##############' );
        console.log( 'this.auctions: ', JSON.stringify( this.auctions ) );

        console.log( '##############' );

    }

    private saveButtonClick(): void {

        if ( this.isAuctionInEditMode ) {
            this.saveAuction();

        }
        else {
            this.itemService.getItem( this.auction.itemId )
                .subscribe( item => {
                    // this.createAuction( this.auction );   ???

                }, ( errData ) => {
                    // ToDo: einbauen: alert nur bei Fehler '500' - error weiter abfangen...
                    console.log( 'error AO: alles gut - wurde abgefangen... (naja, so halbwegs...)' + errData );
                    alert( "Dieser Artikel scheint bei uns nicht vorhanden zu sein..." +
                        "\nbitte Artikel ID überprüfen" )

                }, () => {
                    // ok
                    this.createAuction( this.auction );
                } )
        }
    }

    private newAuctionMode() {
        this.isAuctionInEditMode = false;
        this.formName = 'Neue Auktion erstellen !';
        this.buttonName = 'Neue Auktion speichern !';
        this.itemIdIsDisabled = false
    }

    private getAuctions(): void {
        this.auctionService.getAuctions()
            .subscribe( auctions => {

                this.auctions = auctions;
                this.auctions.sort( ( a, b ) => a.updatedAt > b.updatedAt ? -1 : a.updatedAt < b.updatedAt ? 1 : 0 );
                this.getData();
                this.updateTable();
            } );
    }

    private getData() {

        for ( let auction of this.auctions ) {
            this.itemService.getItem( auction.itemId )
                .subscribe( item => {
                    this.itemParams.push( { itemId: auction.itemId, text2: item.texts[0].name2 } );
                } )
        }

    }

    private saveAuction(): void {
        this.auctionService.updateAuction( this.auction )
            .then( () => this.updateView() );
    }

    private createAuction( auktion: Auction ): Promise<void> {
        let isValidate = false;
        isValidate = this.validateItemId();
        if ( isValidate ) {

            let date = new Date( this.startDate );
            let hour = auktion.startHour;
            let minutes = auktion.startMinute;

            date.setMinutes( minutes );
            date.setHours( hour );
            auktion.startDate = date.getTime() / 1000;

            return this.auctionService.createAuction( auktion )
                       .then( () => {
                           this.getAuctions();
                           this.updateTable();
                           this.initAuction(); // ToDo: wenn erfogreich...
                           // ToDo: überprüfen, ob item da ist (+ Text)
                       } );
        }
    }

    private deleteAuction( auction: Auction ): void {
        this.auctionService
            .deleteAuction( auction.id )
            .then( () => {
                this.auctions = this.auctions.filter( a => a !== auction );
                this.updateTable();

            } );
    }

    private editAuction( auctionId: number ) {

        this.getAuction( auctionId );
        this.isAuctionInEditMode = true;
        this.formName = 'Auktion bearbeiten !';
        this.buttonName = 'Auktion speichern !';
        this.itemIdIsDisabled = true
    }

    private getAuction( auctionId: number ): void {

        this.auctionService.getAuction( auctionId )
            .subscribe( auction => {

                this.auction = auction[0];

                let sP = parseFloat( this.auction.startPrice.toString() ).toFixed( 2 );
                this.auction.startPrice = +sP;
                sP = parseFloat( this.auction.buyNowPrice.toString() ).toFixed( 2 );
                this.auction.buyNowPrice = +sP;

            } );
    }

    private updateView(): void {

        this.initAuction();
        this.newAuctionMode();
        this.getAuctions();
        this.updateTable();
    }

    private updateTable() {

        this._rowList = [];
        for ( let auction of this.auctions ) {

            let cellList: Array<TerraSimpleTableCellInterface> = [];
            let cell: TerraSimpleTableCellInterface;

            // column ##### 1 itemId
            cell = { caption: auction.itemId };
            cellList.push( cell );

            // column ##### 2 Text
            // let text2 = '';
            // for ( let param of this.itemParams ) {
            //     if ( auction.itemId === param.itemId ) {
            //         text2 = param.text2;
            //         break;
            //     }
            // }
            cell = { caption: 'text2' };
            cellList.push( cell );

            let options = DATE_OPTIONS['shortYearLong'];

            // column ##### 3 startDate
            let date = new Date( auction.startDate * 1000 );
            cell = { caption: date.toLocaleDateString( this.locale, options ) };
            cellList.push( cell );

            // column ##### 4 Duration
            cell = { caption: auction.auctionDuration + ' Tage' };
            cellList.push( cell );

            // column ##### 5 endDate
            options = DATE_OPTIONS['longWeakDay'];
            let endDateNumber = date.getTime();
            endDateNumber = endDateNumber + (auction.auctionDuration * 24 * 60 * 60 * 1000);
            date = new Date( endDateNumber );
            cell = { caption: date.toLocaleDateString( this.locale, options ) };
            cellList.push( cell );

            // column ##### 6 startPrice
            let preisFloat = +auction.startPrice;
            cell = { caption: preisFloat.toLocaleString( this.locale, { style: 'currency', currency: 'EUR' } ) };
            cellList.push( cell );

            // column ##### 7 buyNowPrice
            preisFloat = +auction.buyNowPrice
            if ( preisFloat > 1 ) {
                cell = { caption: preisFloat.toLocaleString( this.locale, { style: 'currency', currency: 'EUR' } ) };
            }
            else {
                cell = { caption: '-' };
            }
            ;
            cellList.push( cell );

            // column ##### 8 createdAt
            options = DATE_OPTIONS['long'];
            date = new Date( auction.createdAt * 1000 );
            cell = { caption: date.toLocaleDateString( this.locale, options ) };
            cellList.push( cell );

            // column ##### 9 updatedAt
            date = new Date( auction.updatedAt * 1000 );
            cell = { caption: date.toLocaleDateString( this.locale, options ) };
            cellList.push( cell );

            // column ##### 10 BUTTONS
            let buttonList: Array<TerraButtonInterface> = [];
            buttonList.push( {
                icon         : 'icon-edit',
                clickFunction: () => {
                    // alert( "ToDo - Edit Auktion - ID:" + auction.id )
                    this.editAuction( auction.id );
                },
            } );
            buttonList.push( {
                icon         : 'icon-delete',
                clickFunction: () => {
                    // ToDo Terra Alert bzw. 'ok' + 'cancel'...
                    // alert( "Auktion mit der Artikel-Nr.: " + auction.itemId + " wirklich löschen?" );
                    this.deleteAuction( auction );
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
        console.log( '\nthis.rowList' );
        console.dir( this.rowList );
    }

    private validateItemId(): boolean {
        let isItemIdValid = true;
        for ( let auktion of this.auctions ) {
            if ( auktion.itemId == this.auction.itemId ) {
                isItemIdValid = false;
                alert( "Dieser Artikel hat schon eine Auktion - bitte Artikel ID: " + auktion.itemId + " überprüfen:" )
                return isItemIdValid;
            }
        }
        return isItemIdValid;
    }

    private initAuction(): void {
        this.auction = new Auction;
    }

    private handleError( error: any ): Promise<any> {
        console.error( 'Fehler!! - AO HHHAAAAALLLO :', error ); // for demo purposes only
        return Promise.reject( error.message || error );
    }

}
