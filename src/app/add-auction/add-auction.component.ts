import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Auction } from '../helper/auction'
import { ItemParam } from '../helper/itemParam'
import { AuctionService } from '../services/auction.service';
import { ItemService } from '../services/item.service';
import { TerraButtonInterface, TerraOverlayButtonInterface, TerraOverlayComponent, TerraSelectBoxValueInterface, TerraSimpleTableCellInterface, TerraSimpleTableHeaderCellInterface, TerraSimpleTableRowInterface, } from '@plentymarkets/terra-components';
// import {ModalDirective, ModalModule} from 'ngx-bootstrap';
import { AUCTION_TABLE_HEADER_PROPS, DATE_OPTIONS } from '../helper/constants';

@Component( {
    selector: 'app-add-auction',
    template: require( './add-auction.component.html' ),
    styles  : [require( './add-auction.component.scss' )],
} )
export class AddAuctionComponent implements OnInit {

    @ViewChild( 'modalDelete' ) modalDelete: TerraOverlayComponent;
    private cancelButton: TerraOverlayButtonInterface = {
        icon         : 'icon-cancel',
        caption      : 'Abbruch',
        clickFunction: () => {
            this.modalDelete.hideOverlay();
        },
    }
    @Input() myTitle: string;
    private _viewContainerRef: ViewContainerRef;
    private _durationValues: Array<TerraSelectBoxValueInterface>;
    private _hourValues: Array<TerraSelectBoxValueInterface>;
    private _minuteValues: Array<TerraSelectBoxValueInterface>;
    private itemIdIsDisabled;
    private isAuctionInEditMode;
    private formName = 'Neue Auktion erstellen !';
    private buttonName = 'Neue Auktion speichern !';
    private txtModal = ';'
    private auctionDuration = [];
    private auction: Auction = new Auction;
    private deleteAuctionButton: TerraOverlayButtonInterface = {
        icon         : 'icon-delete',
        caption      : 'Löschen',
        clickFunction: () => {
            this.auctionService.deleteAuction( this.auction.id )
                .subscribe( () => {
                    // this.auctions = this.auctions.filter( a => a !== this.auction );
                    this.getAuctions();

                } );
            this.modalDelete.hideOverlay();
        },
    }
    private auctions: Auction[] = [];
    private itemParams: ItemParam[] = [];
    // private url = URL_HELPER['url'] + '/api/'; // https://schaffrathnumis.de oder ""
    private startDate = '';
    private startDateInput = '';
    private locale = 'de-DE'; // ToDo: NACHDENKEN... von Plenty holen... ???!!?

    constructor( private auctionService: AuctionService, private itemService: ItemService,
        public viewContainerRef: ViewContainerRef ) {
        this._viewContainerRef = viewContainerRef;

        this._durationValues = []; // ToDo: later from configPlugin
        this._hourValues = [];
        this._minuteValues = [];
        this.auctionDuration = [3, 5, 7, 10, 20, 30];
    }

    private _headerList: Array<TerraSimpleTableHeaderCellInterface> = [];

    public get headerList(): Array<TerraSimpleTableHeaderCellInterface> {
        return this._headerList;
    }

    private _rowList: Array<TerraSimpleTableRowInterface> = [];

    public get rowList(): Array<TerraSimpleTableRowInterface> {
        return this._rowList;
    }

    ngDoCheck(): void {
        if ( this.itemParams.length === this.auctions.length ) {
            // this.isParamsLoaded = true;
            this.updateTable();
            this.itemParams = [];
        }
    }

    ngAfterViewInit(): void {
        console.log( 'ngAfterViewInit: ' );
    }

    ngOnInit(): void {
        //test
        // console.dir( this._viewContainerRef );

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

    logProps() {
        console.log( '##############' );
        console.log( 'this.startDateInput: ' + new Date().toDateString() );
        console.log( 'toLocaleDateString: ' + new Date().toLocaleDateString() );
        console.log( 'toISOString: ' + new Date().toISOString() );
        console.log( 'toJSON: ' + new Date().toJSON() );
        console.log( 'toLocaleDateString: ' + new Date().toLocaleDateString() );
        console.log( 'toLocaleTimeString: ' + new Date().toLocaleTimeString() );
        console.log( 'toTimeString: ' + new Date().toTimeString() );
        console.log( 'toUTCString: ' + new Date().toUTCString() );
        console.log( 'valueOf: ' + new Date().valueOf() );
        console.log( '##############' );

    }

    private saveButtonClick(): void {

        if ( this.isAuctionInEditMode ) {
            this.updateAuction();

        }
        else {
            this.itemService.getItem( this.auction.itemId )
                .subscribe( item => {

                }, ( errData ) => {
                    // ToDo: einbauen: alert nur bei Fehler '500' - error weiter abfangen...
                    console.log( 'error AO: ...wurde erst mal nur mit hack abgefangen... ' + errData );
                    alert( "Dieser Artikel scheint bei uns nicht vorhanden zu sein..." +
                        "\nbitte Artikel-ID überprüfen" )

                }, () => {
                    // ok
                    this.createAuction();
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
            .subscribe( response => {

                    this.auctions = response;

                    for ( let auction of response ) {
                        this.itemService.getItem( auction.itemId )
                            .subscribe( item => {
                                this.itemParams.push( {
                                    itemId: auction.itemId,
                                    text2 : item.texts[0].name2,
                                } );
                            }, errData => {
                                this.handleError( errData );
                            }, () => {
                            } )
                    }
                    this.auctions.sort( ( a, b ) => a.updatedAt > b.updatedAt ? -1 : a.updatedAt < b.updatedAt ? 1 : 0 );
                },
                ( errData ) => {                    // ToDo:  alert nur bei Fehler '500' - error weiter abfangen...
                    console.log( 'error AO: getAuctions...)' + errData );
                }, () => {

                } );

    }

    private updateAuction(): void {
        this.formatAuctionStartDate();

        this.auctionService.updateAuction( this.auction )
            .subscribe( () =>
                this.updateView() );
    }

    private createAuction() {
        let isItemValidate = false;
        isItemValidate = this.validateItemId();
        if ( !isItemValidate ) {
            console.log( 'validate: creeate Auction' );
        }
        else {

            this.formatAuctionStartDate();

            this.auctionService.createAuction( this.auction )
                .subscribe( data => {
                        console.dir( data );
                    }, errData => {
                        this.handleError( errData );
                    }, () => {
                        this.initAuction();
                        this.getAuctions();
                    },
                );
        }
    }

    private deleteAuction( auction: Auction ): void {
        this.txtModal = "Auktion mit der Varianten-Nr.: " + auction.itemId + " wirklich löschen?";

        this.auction = auction;
        this.loadAuctionToForm( this.auction );
        this.modalDelete.showOverlay();
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
                this.auction = auction;
                this.loadAuctionToForm( auction );
            } );
    }

    private loadAuctionToForm( auction: Auction ) {

        let d = this.auction.startDate * 1000;
        let dateOTime = new Date( d );

        let dateNow = new Date();

        this.startDate = dateOTime.toISOString();
        this.startDateInput = dateNow.toISOString();

        let sP = parseFloat( this.auction.currentPrice.toString() ).toFixed( 2 );
        this.auction.currentPrice = +sP;
    }

    private updateView(): void {

        this.getAuctions();
        this.newAuctionMode();
        this.initAuction();
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
            let text2 = '';
            for ( let param of this.itemParams ) {
                if ( auction.itemId === param.itemId ) {
                    text2 = param.text2;
                    // ToDo delete object aus array (performance)
                    break;
                }
            }

            cell = { caption: text2 };
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

            // column ##### 6 currentPrice
            let preisFloat = +auction.currentPrice;
            cell = { caption: preisFloat.toLocaleString( this.locale, { style: 'currency', currency: 'EUR' } ) };
            cellList.push( cell );

            // column ##### 7 createdAt
            options = DATE_OPTIONS['long'];
            date = new Date( auction.createdAt * 1000 );
            cell = { caption: date.toLocaleDateString( this.locale, options ) };
            cellList.push( cell );

            // column ##### 8 updatedAt
            date = new Date( auction.updatedAt * 1000 );
            cell = { caption: date.toLocaleDateString( this.locale, options ) };
            cellList.push( cell );

            // column ##### 9 BUTTONS
            let buttonList: Array<TerraButtonInterface> = [];
            let isAuctionWithoutBids: boolean;

            let countBidder = auction.bidderList.length;
            isAuctionWithoutBids = countBidder === 1;

            switch ( auction.tense ) {
                case ('past'):
                    if ( isAuctionWithoutBids ) {
                        buttonList.push( {
                            icon         : 'icon-edit',
                            tooltipText  : 'Auktion (beendet ohne Gebot) bearbeiten',
                            isPrimary    : true,
                            clickFunction: () => {
                                this.editAuction( auction.id );
                            },
                        } );
                        buttonList.push( {
                            icon         : 'icon-delete', /* icon-delete*/
                            tooltipText  : 'Auktion (beendet ohne Gebot) löschen',
                            isPrimary  : true,
                            clickFunction: () => {
                                this.deleteAuction( auction );
                            },
                        } );
                    }
                    else {
                        buttonList.push( {
                            icon         : 'icon-edit',
                            isPrimary    : true,
                            tooltipText  : 'Beendete Auktion mit Geboten kann nicht bearbeitet werden',
                            isDisabled   : true,
                            clickFunction: () => {
                                this.editAuction( auction.id );
                            },
                        } );
                        buttonList.push( {
                            icon         : 'icon-delete', /* icon-delete*/
                            tooltipText  : 'Beendete Auktion (mit Geboten) wirklich löschen',
                            isPrimary  : true,
                            clickFunction: () => {
                                this.deleteAuction( auction );
                            },
                        } );
                    }
                    break;
                case ('present'):
                    if ( isAuctionWithoutBids ) {
                        buttonList.push( {
                            icon         : 'icon-edit',
                            tooltipText  : 'Laufende Auktion (ohne Gebot) bearbeiten',
                            isSecondary  : true,
                            clickFunction: () => {
                                this.editAuction( auction.id );
                            },
                        } );
                        buttonList.push( {
                            icon         : 'icon-delete', /* icon-delete*/
                            tooltipText  : 'Laufende Auktion (ohne Gebot) löschen',
                            isSecondary  : true,
                            clickFunction: () => {
                                this.deleteAuction( auction );
                            },
                        } );
                    }
                    else {
                        buttonList.push( {
                            icon         : 'icon-edit',
                            isDisabled   : true,
                            tooltipText  : 'Laufende Auktion mit Geboten kann nicht bearbeitet werden',
                            clickFunction: () => {
                                this.editAuction( auction.id );
                            },
                        } );
                        buttonList.push( {
                            icon         : 'icon-delete', /* icon-delete*/
                            tooltipText  : 'Laufende Auktion mit Geboten kann nicht gelöscht werden',
                            isDisabled   : true,
                            clickFunction: () => {
                                this.deleteAuction( auction );
                            },
                        } );
                    }
                    break;
                case ('future'):
                    buttonList.push( {
                        icon         : 'icon-edit',
                        tooltipText  : 'Zukünftige Auktion bearbeiten',
                        isTertiary   : true,
                        clickFunction: () => {
                            this.editAuction( auction.id );
                        },
                    } );
                    buttonList.push( {
                        icon         : 'icon-delete', /* icon-delete*/
                        tooltipText  : 'Zukünftige Auktion löschen',
                        isTertiary  : true,
                        clickFunction: () => {
                            this.deleteAuction( auction );
                        },
                    } );
                    break;
            }

            let buttonCell: TerraSimpleTableCellInterface = {
                buttonList: buttonList,
            };
            cellList.push( buttonCell );

            // column ##### 10 Info
            let l = auction.bidderList.length;
            cell = {
                caption: " " + (l - 1).toString() + " ➭ " + auction.bidderList[l - 1].bidPrice.toLocaleString( this.locale,
                    { style: 'currency', currency: 'EUR' } ),
                icon   : 'icon-payment_assign',
                tooltipText  : 'Anzahl Gebote / Höchstgebot',
            };
            cellList.push( cell );

            let row: TerraSimpleTableRowInterface = {
                cellList: cellList,
            };
            this.rowList.push( row );
        }
    }

    private hideModalDeleteAuction() {
        this.initAuction();
        this.newAuctionMode();
    }

    private validateItemId(): boolean {
        let isItemIdValid = true;
        for ( let auktion of this.auctions ) {
            if ( auktion.itemId == this.auction.itemId ) {
                isItemIdValid = false;
                alert( "Dieser Artikel hat schon eine Auktion - bitte Artikel-ID: " + auktion.itemId + " überprüfen:" )
                return isItemIdValid;
            }
        }
        return isItemIdValid;
    }

    private formatAuctionStartDate() {
        let date = new Date( this.startDate );
        let hour = this.auction.startHour;
        let minutes = this.auction.startMinute;

        date.setMinutes( minutes );
        date.setHours( hour );

        this.auction.startDate = date.getTime() / 1000;
    }

    private initAuction(): void {
        this.auction = new Auction;
        let dateOTime = new Date().getTime();
        // dateOTime = dateOTime  / 1000;
        let date = new Date( dateOTime );

        this.startDateInput = date.toISOString();
        this.startDate = this.startDateInput;
    }

    private handleError( error: any ) {
        console.error( 'Fehler!! - AO HHHAAAAALLLO :', error ); // for demo purposes only
        // return Promise.reject( error.message || error );
    }

}
