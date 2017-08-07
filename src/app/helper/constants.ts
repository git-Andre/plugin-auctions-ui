

export const AUCTION_TABLE_HEADER_PROPS: object[] = [
    {caption: 'Item ID', width: 8, tooltipText: 'Artikel ID'},
    {caption: 'Item text', width: 300, tooltipText: 'Artikel Text'},
    {caption: 'Start date', width: 8, tooltipText: 'Start Datum'},
    {caption: 'Duration', width: 1, tooltipText: 'Auktions Dauer'},
    {caption: 'End date', width: 1, tooltipText: 'Auktions Ende'},
    {caption: 'Start price', width: 8, tooltipText: 'Start Preis'},
    {caption: 'Buy Now Price', width: 8, tooltipText: 'Sofort Kaufen Preis'},
    {caption: 'Created on', width: 8, tooltipText: 'Erstellt am'},
    {caption: 'Last Change', width: 30, tooltipText: 'Letzte Änderung'},
    {caption: 'Actions', width: 120, tooltipText: 'Auktion bearbeiten löschen'}
];

export const HELPER: object = {url: "https://schaffrathnumis.de"};
// export const URL_HELPER: object = {url: ""};


export const DATE_OPTIONS: object = {
    short: { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' },
    long : { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' },
    shortYearLong : { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' },

    longWeakDay: {
        weekday     : 'short',
        year        : '2-digit',
        month       : '2-digit',
        day         : '2-digit',
        hour        : '2-digit',
        minute      : '2-digit',
        timeZoneName: 'short',

    },
};
