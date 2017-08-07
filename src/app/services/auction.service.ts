import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
import { Auction } from '../auction/auction';
import 'rxjs/add/operator/toPromise';

interface Auktionen {
    auktionen: Auction[];
}

@Injectable()
export class AuctionService {

    constructor(
        private http: Http ) {
    }

    private auth = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA3ZTg0NDNmOGFmMTJiNzJhMjkzNGU3YzhlMWM4ZTQyNDkyNjA3OWYyYmQyMzU3ZmVmM2NkZWJlZjM4OTZlOTUyZmM4MjFiOThhZmZkMDdhIn0.eyJhdWQiOiIxIiwianRpIjoiMDdlODQ0M2Y4YWYxMmI3MmEyOTM0ZTdjOGUxYzhlNDI0OTI2MDc5ZjJiZDIzNTdmZWYzY2RlYmVmMzg5NmU5NTJmYzgyMWI5OGFmZmQwN2EiLCJpYXQiOjE1MDE0MTA0NTQsIm5iZiI6MTUwMTQxMDQ1NCwiZXhwIjoxNTAxNDk2ODU0LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.Y_U3ZzOurLpjc7Rn9zEw-PdQMDos5_NaXK4O_b4nn_rZ0xKk9hq8wRbRHd25Vf9NfZkksLi7COr0jSX6JzzVSGvwKxcorpFeEdKSyjgl-2UEahJbhCcDqytIDgOFvbPAuo5IJldUBejv1S6lg0RPVnWzUMtwhf0Qpde_hadhr_mtS01sn-5b1GagFzWZycxXu9NxSmlY97m9z-xpk-Yd7N2wjp6zU5v1bR604aB1RNTrzjvDwvRYJncH7fdljdMHIXU6TLqZZWk388QcquT-S6sYi3h96J7QSLHDnkOitPdVImqQMFSn2fmvoaX468zrwk3gvBlKJm8QyN_eTCBGSIsuD251pQ2XQIjC_ve6l5EGSxA_whEDxkNS4B2JapvEv4tphas6QVk5zsWmikSU5XfvV6UEYodMp8a9OkGWL63leuxTVmc4TMaJHrWITTjXj1I-Q3NKDrNKhHYbXxc1iSfzFtbH4WRpd2iZSU9qnx_bqpfWSbmCfWjTnZsgAmmjGKDp-b08KZoNlhFuRPqLdFNnukxb5zuEuQj6s8lHH0eLPykmjuY9XLHm4A1-BxXevHUPNHTsp5t93vXH67kLaV2BHnaAMdNeFt5C-Cta6XkzVEDZW77cSDkoMrWFuRPbQ1WFk5V66FngGrYoC0xkRkCq9aO2DLUC3BzNzCpbS2A';

    private url = '/api/'; // https://schaffrathnumis.de
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
