import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
import { Auction } from '../auction/auction';
import 'rxjs/add/operator/toPromise';
import { URL_HELPER } from '../helper/url-helper';

interface Auktionen {
    auktionen: Auction[];
}

@Injectable()
export class AuctionService {

    constructor(
        private http: Http ) {
    }


    private url = URL_HELPER['url'] + '/api/'; // https://schaffrathnumis.de oder ""
    private headers = new Headers( { 'Content-Type': 'application/json' } )



    public createAuction( auction: Auction ): Promise<void> {
        let url = this.url + 'auction/';
        console.log( 'auction create: ' + auction );

        return this.http.post( url, auction, { headers: this.headers } )
                   .toPromise()
                   .then( res => {
                   } )
                   .catch( this.handleError );
    }

    public deleteAuction( id: number ): Promise<void> {
        let url = this.url + 'auction/' + id;

        return this.http.delete( url/*, { headers: this.headers }*/ )
                   .toPromise()
                   .then( () => null )
                   .catch( this.handleError );
    }

    public updateAuction( auction: Auction ): Promise<void> {
        let url = this.url + 'auction/' + auction.id;

        return this.http.put( url,  auction, {headers: this.headers} )
                   .toPromise()
                   .then( () => null )
                   .catch( this.handleError );

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
