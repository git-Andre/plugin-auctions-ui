import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TerraComponentsModule } from '@plentymarkets/terra-components/app/terra-components.module';
import { HttpModule } from '@angular/http';
// import { HttpClientModule } from '@angular/common/http';
import { TranslationModule } from 'angular-l10n';
import { FormsModule } from '@angular/forms';

import { PluginAuctionsComponent } from './plugin-auctions-ui.component';
import { AddAuctionComponent } from './add-auction/add-auction.component';
import { TestComponent } from './test/test.component';

import { AuctionService } from './services/auction.service';
import { ItemService } from './services/item.service';

@NgModule( {
    imports     : [
        BrowserModule,
        HttpModule,
        // HttpClientModule,
        FormsModule,
        TranslationModule.forRoot(),
        TerraComponentsModule.forRoot(),

    ],
    declarations: [
        PluginAuctionsComponent,
        AddAuctionComponent,
        TestComponent,
        // AuctionsComponent,
    ],

    providers: [ AuctionService,
                 ItemService ],

    bootstrap: [
        PluginAuctionsComponent,
    ],
} )
export class PluginAuctionsModule {
}
