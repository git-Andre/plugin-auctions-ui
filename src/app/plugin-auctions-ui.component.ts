import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Translation, TranslationService } from 'angular-l10n';

@Component({
    selector       : 'app-plugin-auctions-ui',
    template       : require('./plugin-auctions-ui.component.html'),
    styles         : [require('./plugin-auctions-ui.component.scss')],
    changeDetection: ChangeDetectionStrategy.Default,
})

export class PluginAuctionsComponent extends Translation {
    private myVariable: string;

    public constructor(public translation: TranslationService) {
        super(translation);

        this.myVariable = "Translation Test";
    }

    title = 'Auktionen - SchaffrathNumis Webshop';

}
