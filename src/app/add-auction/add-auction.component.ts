import { Component, Input, OnInit } from '@angular/core';
import { Auction } from '../helper/auction'
import { AuctionService } from '../services/auction.service';
import { ItemService } from '../services/item.service';
import { TerraSelectBoxValueInterface, } from '@plentymarkets/terra-components';
// import { TimeFormatPipe } from './timeFormat.pipe';
// import { Pipe, PipeTransform } from '@angular/core';

@Component( {
    selector: 'app-add-auction',
    template: require( './add-auction.component.html' ),
    styles  : [require( './add-auction.component.scss' )],
} )
export class AddAuctionComponent implements OnInit {

    @Input() myTitle: string;
    @Input() inputIsFormInEditMode: boolean;

    auctionDuration = [3, 5, 7, 10, 20, 30]; // ToDo: later from configPlugin
    //
    private _durationValues: Array<TerraSelectBoxValueInterface> = [];
    private _hourValues: Array<TerraSelectBoxValueInterface> = [];
    private _minuteValues: Array<TerraSelectBoxValueInterface> = [];

    private itemIdIsDisabled = false;
    private formName = 'Neue Auktion erstellen !';
    private buttonName = 'Neue Auktion speichern !';
    private auction: Auction = new Auction;
    private auctions: Auction[] = [];

    private startDate = new Date().toISOString();
    private locale = 'de-DE'; // ToDo: NACHDENKEN... ???!!?
    // private isItemIdValid = true;

    constructor( private auctionService: AuctionService, private itemService: ItemService ) {
    }

    ngOnInit(): void {
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
    }

    private saveButtonClick(): void {

        if ( this.inputIsFormInEditMode ) {
            // this.saveAuction();
            console.dir( this.auction );

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
        this.inputIsFormInEditMode = false;
        this.formName = 'Neue Auktion erstellen !';
        this.buttonName = 'Neue Auktion speichern !';
        this.itemIdIsDisabled = false
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

    // private editAuction( auctionId: number ) {
    //
    //     this.getAuction( auctionId );
    //     // this.inputIsFormInEditMode = true;
    //     this.formName = 'Auktion bearbeiten !';
    //     this.buttonName = 'Auktion speichern !';
    //     this.itemIdIsDisabled = true
    // }

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

        // this.initAuction();
        // this.newAuctionMode();
        // this.getAuctions();
        // this.updateTable();
    }
    private editAuction( auctionId: number ) {

        this.getAuction( auctionId );
        this.inputIsFormInEditMode = true;
        this.formName = 'Auktion bearbeiten !';
        this.buttonName = 'Auktion speichern !';
        this.itemIdIsDisabled = true
    }

    private updateTable() {
        // könnte höchstens ein helper werden
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

    // ToDo : remove this when we're done
    get diagnostic2() {
        // return JSON.stringify( this.auction )
        return null
    }

    logProps() {
        console.log( '##############' );
        console.log( 'logProp: ', JSON.stringify( this.inputIsFormInEditMode ) );

        console.log( '##############' );

    }

}
