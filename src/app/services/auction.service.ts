import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
import { Auction } from '../helper/auction';
// import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { URL_HELPER } from '../helper/constants';

import { TerraBaseService, TerraLoadingSpinnerService } from '@plentymarkets/terra-components';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operator/map';

@Injectable()
export class AuctionService extends TerraBaseService {

    // private url = URL_HELPER['url'] + '/api/'; // https://schaffrathnumis.de oder ""
    headers = new Headers( { 'Content-Type': 'application/json' } )

    constructor( private _loadingSpinnerService: TerraLoadingSpinnerService,
        private _http: Http ) {
        super( _loadingSpinnerService, _http, URL_HELPER['url'] + '/api/' );
    }

    ngOnInit(): void {
        // ToDO: bei API Routes Umstellung dieses in die einzelnen Methoden... ??!
        // this.headers.set( 'Authorization', 'Bearer ' + AUTH_HELPER[ 'auth' ] );
    }

    // this.headers.set('Authorization', 'Bearer ' + AUTH_HELPER['auth']);

    public getAuctions(): Observable<any> {
        this.setAuthorization();

        let url: string;

        url = this.url + 'auctions/';

        return this.mapRequest(
            this.http.get( url ),
        );
    }

    public getAuction( itemId: number ): Observable<any> {
        this.setAuthorization();

        let url: string;

        url = this.url + 'auction/' + itemId;

        return this.mapRequest(
            this.http.get( url, {
                headers: this.headers,
                body   : '',
            } ),
        );
    }

    public createAuction( auction: Auction ): Observable<any> {
        this.setAuthorization();

        let url = this.url + 'auction';

            // return this.http.post( url, auction, { headers: this.headers } );
        return this.mapRequest(
            this.http.post( url, auction, { headers: this.headers } )
        );
    }

    public deleteAuction( id: number ): Observable<any> {
        this.setAuthorization();

        let url = this.url + 'auction/' + id;

        return this.mapRequest(
            this.http.delete( url, { headers: this.headers } ),
        );
    }

    public updateAuction( auction: Auction ): Observable<any> {
        this.setAuthorization();

        let url = this.url + 'auction/' + auction.id;

        return this.mapRequest(
            this.http.put( url, auction, { headers: this.headers } ),
        );
    }

    // public getAuction( id: number ): Promise<Auction> {
    //
    //     let url: string;
    //     url = this.url + 'auction/' + id;
    //
    //     return this.http.get( url )
    //                .toPromise()
    //                .then( response => {
    //                    JSON.parse( response.text() ) as Auction;
    //                    console.log( 'response: ' + JSON.parse( response.text() ) );
    //                } )
    //                .catch( this.handleError );
    // }

    // public saveSettings( data: any ): Observable<any> {
    //     this.setAuthorization();
    //
    //     let url: string;
    //
    //     url = this.url + 'payment/payPal/settings/';
    //
    //     return this.mapRequest(
    //         this.http.post( url, data, { headers: this.headers } ),
    //     );
    // }

    // public getWebstores(): Observable<any> {
    //     this.setAuthorization();
    //
    //     let url: string;
    //
    //     url = this.url + 'webstores/';
    //
    //     this.headers.set( 'Authorization', 'Bearer ' + this.auth );
    //
    //     return this.mapRequest(
    //         this.http.get( url, {
    //             headers: this.headers,
    //             body   : '',
    //         } ),
    //     );
    // }

    private handleError( error: any ): Promise<any> {
        console.error( 'Fehler!! - AO :', error ); // for demo purposes only
        return Promise.reject( error.message || error );
    }

    // public getShippingCountries():Observable<any>
    // {
    //     this.setAuthorization();
    //
    //     let url:string;
    //
    //     url = this.url + 'orders/shipping/countries/';
    //
    //     this.headers.set('Authorization', 'Bearer ' + this.auth);
    //
    //     return this.mapRequest(
    //         this.http.get(url, {
    //             headers: this.headers,
    //             body:    ''
    //         })
    //     );
    // }

    // public getAccounts():Observable<any>
    // {
    //     this.setAuthorization();
    //
    //     let url:string;
    //
    //     url = this.url + 'payment/payPal/accounts/';
    //
    //     //this.headers.set('Authorization', 'Bearer hhPhh4iexOt5hi6mM5AoQTkQy6RmWOBXhaOkjJpW');
    //     this.headers.set('Authorization', 'Bearer ' + this.auth);
    //
    //     return this.mapRequest(
    //         this.http.get(url, {
    //             headers: this.headers,
    //             body:    ''
    //         })
    //     );
    // }
}
