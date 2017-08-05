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
// import { AuctionsComponent } from './auctions/auctions.component';

import { AuctionService } from './services/auction.service';
import { TimeFormatPipe } from './helper/timeFormat.pipe';


@NgModule({
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
        TimeFormatPipe
        // AuctionsComponent,
    ],
    // pipe: [LoginTimeFormatPipe],

    providers   : [AuctionService],

    bootstrap: [
        PluginAuctionsComponent,
    ],
})
export class PluginAuctionsModule {
}
