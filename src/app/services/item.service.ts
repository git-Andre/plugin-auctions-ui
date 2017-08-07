import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
    TerraBaseService,
    TerraLoadingSpinnerService
} from '@plentymarkets/terra-components';
import { Observable } from 'rxjs';
import { AUTH_HELPER, URL_HELPER } from '../helper/url-helper';



@Injectable()
export class ItemService extends TerraBaseService
{
    constructor(private _loadingSpinnerService:TerraLoadingSpinnerService,
        private _http:Http)
    {
        super(_loadingSpinnerService, _http, URL_HELPER['url'] + '/rest/');
    }

    public getItem(itemId:number):Observable<any>
    {
        // this.setAuthorization();
        this.headers.set('Authorization', 'Bearer ' + AUTH_HELPER['auth']);

        let url:string;

        url = this.url + 'items/' + itemId;

        return this.mapRequest(
            this.http.get(url, {
                headers: this.headers,
                body:    ''

            })

        );
    }

/*
    public saveSettings(data:any):Observable<any>
    {
        this.setAuthorization();

        let url:string;

        url = this.url + 'payment/payPal/settings/';

        return this.mapRequest(
            this.http.post(url, data, {headers: this.headers})
        );
    }

    public getWebstores():Observable<any>
    {
        this.setAuthorization();

        let url:string;

        url = this.url + 'webstores/';

        //this.headers.set('Authorization', 'Bearer hhPhh4iexOt5hi6mM5AoQTkQy6RmWOBXhaOkjJpW');

        return this.mapRequest(
            this.http.get(url, {
                headers: this.headers,
                body:    ''
            })
        );
    }


    public getShippingCountries():Observable<any>
    {
        this.setAuthorization();

        let url:string;

        url = this.url + 'orders/shipping/countries/';

        //this.headers.set('Authorization', 'Bearer hhPhh4iexOt5hi6mM5AoQTkQy6RmWOBXhaOkjJpW');

        return this.mapRequest(
            this.http.get(url, {
                headers: this.headers,
                body:    ''
            })
        );
    }

    public getAccounts():Observable<any>
    {
        this.setAuthorization();

        let url:string;

        url = this.url + 'payment/payPal/accounts/';

        //this.headers.set('Authorization', 'Bearer hhPhh4iexOt5hi6mM5AoQTkQy6RmWOBXhaOkjJpW');

        return this.mapRequest(
            this.http.get(url, {
                headers: this.headers,
                body:    ''
            })
        );
    }
*/
}
