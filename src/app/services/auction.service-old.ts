import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http'
import 'rxjs/add/operator/toPromise';

import { Auction } from '../auction/auction';

@Injectable()
export class AuctionService {


    constructor(private http: Http) {

    }
    private auctionsUrl = 'https://www.schaffrathnumis.de/auction/'
    private headers = new Headers({'Content-Type': 'application/json'});

    getAuctions(): Promise<Auction[]> {
        return this.http.get(this.auctionsUrl)
                   .toPromise()
                   .then(response => response.json().data as Auction[])
                   .catch(this.handleError);
    }

    getAuction(id: number): Promise<Auction> {
        const url = `${this.auctionsUrl}/${id}`;
        return this.http.get(url)
                   .toPromise()
                   .then(response => response.json().data as Auction)
                   .catch(this.handleError);
    }

    create(auction: Auction): Promise<Auction> {
        return this.http
                   .post(this.auctionsUrl, JSON.stringify({auction: auction}), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json().data as Auction)
                   .catch(this.handleError);
    }


    delete(id: number): Promise<void> {
        const url = `${this.auctionsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
                   .toPromise()
                   .then(() => null)
                   .catch(this.handleError);
    }

    update(auction: Auction): Promise<Auction> {
        const url = `${this.auctionsUrl}/${auction.id}`;
        return this.http
                   .put(url, JSON.stringify(auction), {headers: this.headers})
                   .toPromise()
                   .then(() => auction)
                   .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Fehler!! :', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
