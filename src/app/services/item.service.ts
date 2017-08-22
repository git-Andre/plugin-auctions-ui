import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {
    TerraBaseService,
    TerraLoadingSpinnerService
} from '@plentymarkets/terra-components';
import { Observable } from 'rxjs';
import { AUTH_HELPER, URL_HELPER } from '../helper/constants';



@Injectable()

export class ItemService extends TerraBaseService
{

    headers = new Headers( { 'Content-Type': 'application/json' } )

    constructor(private _loadingSpinnerService:TerraLoadingSpinnerService,
        private _http:Http)
    {
        super(_loadingSpinnerService, _http, URL_HELPER['url'] + '/rest/');
    }
    ngOnInit(): void {
        // this.headers.set( 'Authorization', 'Bearer ' + AUTH_HELPER[ 'auth' ] );

    }

    public getVariation(variationId: number):Observable<any>
    {
        this.headers.set('Authorization', 'Bearer ' + AUTH_HELPER['auth']);
        this.setAuthorization();

        let url:string;
        url = this.url + 'items/' + variationId;

        return this.mapRequest(
            this.http.get(url, {
                headers: this.headers,
                body:    ''
            })

        );
    }
}
